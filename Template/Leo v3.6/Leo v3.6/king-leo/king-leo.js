function selectThumb(item) {
    const thumb_aiz = document.getElementById("thumb_ai");
    thumb_aiz.value = item;
}
(function($) {
    "use strict";
    $('#ai-submit').on('click', (event) => {
        event.preventDefault();
        const input = document.getElementById("ai-box");
        const {
            value
        } = input;
        const nprompt = document.getElementById("n_prompt");
        if (nprompt) {
            var npvalue = nprompt.value;
        } else {
            var npvalue = '';
        }
        const results = document.getElementById("ai-results");
        const {
            value: selectElement
        } = document.getElementById("ai-select");
        if (!value.trim()) {
            return;
        }
        var radioBut = $("input:radio[name=aisize]:checked").val();
        var aistyle = $("input:radio[name=aistyle]:checked").val();
        const submit = event.currentTarget;
        submit.disabled = true;
        input.disabled = true;
        submit.classList.add("loading");
        $.ajax({
            type: 'POST',
            url: leoai,
            dataType: 'json',
            data: {
                input: value,
                select: selectElement,
                radio: radioBut,
                style: aistyle,
                npvalue: npvalue,
            },
            success: (response) => {
                console.log(response);
                if (response.success) {
                    const sresult = response.message.out;
                    const format = response.message.format;
                    if (format === 'bas') {
                        var images = sresult.map(base64 => `<div class="ai-imgs" id="ai-imgs"><img src="data:image/png;base64, ${base64}"/><div id="king-aimg" data-saimg="${base64}"></div><a class="aidownl" title="Download" href="data:image/png;base64, ${base64}" download><i class="fa-solid fa-download"></i></a></div>`);
                    } else {
                        var images = sresult.map(url => `<div class="ai-imgs" id="ai-imgs"><img src="${url}"/><div id="king-aimg" data-aimg="${url}"></div><a class="aidownl" title="Download" href="${url}" download target="_blank"><i class="fa-solid fa-download"></i></a></div>`);
                    }
                    results.style.display = 'flex';
                    let html = '<div class="ai-result">';
                    html += '<div class="ai-result-up">';
                    if (selectElement === 'sd') {
                        html += '<span>Stable Diffusion</span>';
                    }
                    if (selectElement === 'de') {
                        html += '<span>Dall-e</span>';
                    }
                    if (selectElement === 'de3') {
                        html += '<span>Dall-e 3</span>';
                    }
                    html += '<span>' + radioBut + '</span>';
                    if (aistyle) {
                        html += '<span>' + aistyle + '</span>';
                    }
                    html += '</div>';
                    html += images.join('');
                    html += '</div>';
                    results.insertAdjacentHTML('afterbegin', html);
                    input.disabled = false;
                    submit.disabled = false;
                    submit.classList.remove("loading");
                    const textarea = document.getElementById("pcontent2");
                    textarea.value = value;
                    const npromp = document.getElementById("npromp");
                    npromp.value = npvalue;
                    if (aupload) {
                        const kingAimgs = document.querySelectorAll('#king-aimg');
                        kingAimgs.forEach((img) => {
                            img.click();
                        });
                    }
                } else {
                    results.style.display = 'flex';
                    results.innerHTML += response.message;
                    input.disabled = false;
                    submit.disabled = false;
                    submit.classList.remove("loading");
                }
            }
        });
    });
    $(document).on('click', '#king-aimg', (event) => {
        const iurl = event.target.dataset.aimg;
        const siurl = event.target.dataset.saimg;
        if (!iurl && !siurl) {
            return;
        }
        event.target.classList.add("loading");
        $.ajax({
            type: 'POST',
            url: leoai,
            data: {
                iurl: iurl,
                siurl: siurl
            },
            success: (response) => {
                var e = JSON.parse(response);
                const aiimgs = document.getElementById("ai-form");
                const thumb_ai = document.getElementById("thumb_ai");
                event.target.classList.add("ldone");
                event.target.classList.remove("loading");
                var inp = document.createElement("INPUT");
                var radio = document.createElement("INPUT");
                var label = document.createElement("label");
                var rdiv = document.createElement("div");
                inp.setAttribute("type", "hidden");
                inp.setAttribute("name", "submit_image[]");
                inp.setAttribute("id", "submit_image_" + e.main);
                inp.setAttribute("value", e.main);
                radio.setAttribute("value", e.thumb);
                radio.setAttribute("type", "radio");
                radio.setAttribute("name", "thumbz");
                radio.setAttribute("id", "thumb_" + e.thumb);
                radio.setAttribute("class", "thumb-radio hide");
                radio.setAttribute("checked", true);
                label.setAttribute("title", "set as thumb");
                label.setAttribute("class", "thumb-radio-label");
                label.setAttribute("for", "thumb_" + e.thumb);
                label.setAttribute('onclick', 'selectThumb(' + e.thumb + ')');
                rdiv.setAttribute("id", "king-rimg");
                rdiv.setAttribute("data-rid", e.main);
                aiimgs.appendChild(inp);
                thumb_ai.value = e.thumb;
                event.target.parentElement.appendChild(radio);
                event.target.parentElement.appendChild(label);
                event.target.parentElement.appendChild(rdiv);
                delete event.target.dataset.aimg;
                delete event.target.dataset.saimg;
            },
            error: (xhr, status, error) => {
                console.error(error);
            }
        });
    });
    $(document).on('click', '#king-rimg', (event) => {
        const rid = event.target.dataset.rid;
        const ridt = rid - 1;
        var params = {};
        params.thumbid = ridt;
        params.fileid = rid;
        qa_ajax_post('mdelete', params, function(lines) {
            if (lines[0] == '0') {
                const cInput = document.getElementById('thumb_' + ridt);
                const closestLabel = document.querySelector('label.thumb-radio-label');
                if (closestLabel && cInput.checked) {
                    closestLabel.click();
                    const inputId = closestLabel.getAttribute('for');
                    const correspondingInput = document.getElementById(inputId);
                    if (correspondingInput) {
                        correspondingInput.checked = true;
                    }
                }
                const parentDiv = event.target.parentElement;
                parentDiv.remove();
                const inputToRemove = document.getElementById(`submit_image_${rid}`);
                if (inputToRemove) {
                    inputToRemove.remove();
                }
            }
        });
    });
    const selectBox = document.getElementById("ai-select");
    const selectedValue = document.getElementById("desizes");
    var firstTabLink = document.querySelector('#ssize li:first-child a');
    if (selectBox) {
        selectBox.addEventListener("change", function() {
            selectedValue.className = selectBox.value;
            document.getElementById("aisize3").checked = true;
            const wai = document.getElementById("wai");
            wai.value = selectBox.value;
            // Remove the "active" class from all <li> elements
            // Trigger a click event on the first tab's <a> element
            firstTabLink.click();
        });
    }
    const radioButtons = document.getElementsByName('aistyle');
    const resultInput = document.getElementById('stle');
    radioButtons.forEach(radioButton => {
        radioButton.addEventListener('click', function() {
            resultInput.value = this.value;
        });
    });

$('#prompter').on('click', (event) => {
    event.preventDefault();
    const input = document.getElementById("ai-box");
    const { value } = input;

    const submit = event.currentTarget;
    submit.disabled = true;
    submit.classList.add("loading");

    $.ajax({
        type: 'POST',
        url: leoai,
        dataType: 'json',
        data: {
            pinput: value,
            promter: true,
        },
        success: (response) => {
            console.log(response);
            if (response.success) {
                const sresult = response.message;
                let index = 0;
                input.value = "";
                const typingInterval = setInterval(() => {
                    const char = sresult.charAt(index);
                    input.value += char; // Append char to textarea value
                    index++;
                    input.style.height = "auto"; // Reset height to auto
                    input.style.height = `${input.scrollHeight}px`;
                    if (index >= sresult.length) {
                        clearInterval(typingInterval);
                        // Enable the submit button and remove loading class
                        submit.disabled = false;
                        submit.classList.remove("loading");
                    }
                }, 20);

            } else {
                console.log(response.data);
                input.value += response.data; // Append response data to textarea value
                // Enable the submit button and remove loading class
                submit.disabled = false;
                submit.classList.remove("loading");
            }
        }
    });
});   

$(document).on('input', '#ai-box', (event) => {
    const textarea = event.target;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to fit the content
});
    
})(jQuery);