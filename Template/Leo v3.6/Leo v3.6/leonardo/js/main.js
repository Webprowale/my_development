! function(e) {
    "use strict";
    e(document).ready((function() {
        if (o(), "undefined" != typeof Masonry) {
            var t = document.querySelector(".king-part-q-list .container"),
                n = new Masonry(t, {
                    itemSelector: ".box",
                    percentPosition: !0,
                    visibleStyle: {
                        transform: "translateY(0)",
                        opacity: 1
                    },
                    hiddenStyle: {
                        transform: "translateY(100px)",
                        opacity: 0
                    }
                }),
                i = e.ias({
                    container: ".container",
                    item: ".box",
                    pagination: ".king-page-links-list",
                    next: ".king-page-next",
                    delay: 300,
                    negativeMargin: 200
                });
            i.on("render", (function(t) {
                e(t).css({
                    opacity: 0
                })
            })), i.on("rendered", (function(t) {
                n.appended(t), o(), a(), e('[data-toggle="tooltip"]').tooltip()
            })), i.extension(new IASSpinnerExtension({
                html: '<div class="switch-loader"><span class="loader"></span></div>'
            })), i.extension(new IASTriggerExtension({
                offset: "2",
                text: "Load More"
            })), i.extension(new IASNoneLeftExtension({
                html: '<div class="load-nomore"><span>End of the page.</span></div>'
            }))
        }

        function a() {
            e(".ajax-popup-link").magnificPopup({
                type: "ajax",
                closeOnBgClick: !1,
                closeBtnInside: !1,
                preloader: !0,
                tLoading: '<div class="loader"></div>',
                removalDelay: 120,
                callbacks: {
                    ajaxContentAdded: function() {
                        var e = document.getElementById("my-video");
                        e && videojs(e), o(), l(), p()
                    },
                    parseAjax: function(t) {
                        t.data = e(t.data).find(".king-video, .rightview, .king-part-custom")
                    }
                }
            }), e(".king-listen").magnificPopup({
                type: "ajax",
                fixedContentPos: !1,
                preloader: !0,
                mainClass: "king-listener",
                overflowY: "scroll",
                tLoading: '<div class="loader"></div>',
                removalDelay: 120,
                callbacks: {
                    ajaxContentAdded: function() {
                        s()
                    },
                    parseAjax: function(t) {
                        t.data = e(t.data).find(".king-playlist")
                    }
                }
            }), e(".ajax-popup-share").magnificPopup({
                type: "ajax",
                closeOnBgClick: !1,
                closeBtnInside: !1,
                preloader: !0,
                tLoading: '<div class="loader"></div>',
                removalDelay: 120,
                callbacks: {
                    parseAjax: function(t) {
                        t.data = e(t.data).find(".social-share")
                    }
                }
            })
        }

        function o() {
            var e = [].slice.call(document.querySelectorAll("[data-king-img-src]"));
            if ("IntersectionObserver" in window) {
                var t = new IntersectionObserver((function(e) {
                    e.forEach((function(e) {
                        if (e.isIntersecting) {
                            var n = e.target,
                                i = n.getAttribute("data-king-img-src");
                            if (i)
                                if (n.classList.contains("king-lazy")) {
                                    n.addEventListener("load", (function() {
                                        n.style.height = "", n.style.width = "", n.classList.add("loaded"), n.removeAttribute("data-king-img-src"), t.unobserve(n)
                                    })), n.src = i;
                                    var a = n.getAttribute("data-king-img-srcset");
                                    a && (n.setAttribute("srcset", a), n.removeAttribute("data-king-img-srcset")), n.parentNode.classList.add("img-loaded")
                                } else n.style.backgroundImage = "url('" + i + "')", n.classList.add("loaded"), n.removeAttribute("data-king-img-src"), t.unobserve(n)
                        }
                    }))
                }), {
                    rootMargin: "300px"
                });
                e.forEach((function(e) {
                    t.observe(e)
                }))
            } else e.forEach((function(e) {
                if (e.classList.contains("king-lazy")) {
                    e.style.height = "", e.style.width = "", e.src = e.getAttribute("data-king-img-src");
                    var t = e.getAttribute("data-king-img-srcset");
                    t && (e.setAttribute("srcset", t), e.removeAttribute("data-king-img-srcset")), e.parentNode.classList.add("img-loaded"), e.classList.add("loaded"), e.removeAttribute("data-king-img-src")
                } else e.style.backgroundImage = "url('" + e.getAttribute("data-king-img-src") + "')", e.classList.add("loaded"), e.removeAttribute("data-king-img-src")
            }))
        }

        function s() {
            var e = document.querySelector(".king-playlist-data");
            if (e) {
                var t = JSON.parse(e.innerHTML),
                    n = videojs(document.querySelector(".video-js"), {
                        controlBar: {
                            fullscreenToggle: !1,
                            volumePanel: {
                                inline: !1,
                                volumeControl: {
                                    vertical: !0
                                }
                            }
                        },
                        inactivityTimeout: 0
                    });
                try {
                    n.volume(1)
                } catch (e) {}
                n.playlist(t), n.playlist.autoadvance(0);
                var i = videojs.getComponent("Button"),
                    a = videojs.extend(i, {
                        constructor: function() {
                            i.apply(this, arguments), this.addClass("icon-angle-left"), this.controlText("Previous")
                        },
                        handleClick: function() {
                            console.log("click"), n.playlist.previous()
                        }
                    }),
                    o = videojs.extend(i, {
                        constructor: function() {
                            i.apply(this, arguments), this.addClass("icon-angle-right"), this.controlText("Next")
                        },
                        handleClick: function() {
                            console.log("click"), n.playlist.next()
                        }
                    }),
                    s = videojs.extend(i, {
                        constructor: function() {
                            i.apply(this, arguments), this.addClass("vjs-chapters-button"), this.controlText("Show Playlist")
                        },
                        handleClick: function() {
                            var e = document.getElementById("king-playlist");
                            "none" === e.style.display ? e.style.display = "block" : e.style.display = "none"
                        }
                    });
                videojs.registerComponent("NextButton", o), videojs.registerComponent("PrevButton", a), videojs.registerComponent("ShowPlaylist", s), n.getChild("controlBar").addChild("PrevButton", {}, 1), n.getChild("controlBar").addChild("NextButton", {}, 2), n.getChild("controlBar").addChild("ShowPlaylist", {}, 12), n.playlistUi()
            }
        }

        function l() {
            e(".king-gallery").owlCarousel({
                nav: !0,
                margin: 10,
                autoWidth: !0,
                autoHeight: !0,
                center: !1,
                loop: !1,
                items: 2,
                navText: ['<i class="fa fa-chevron-left" aria-hidden="true"></i>', '<i class="fa fa-chevron-right" aria-hidden="true"></i>'],
                responsive: {
                    0: {
                        items: 1,
                        autoWidth: !1
                    },
                    600: {
                        items: 2
                    }
                }
            })
        }
        a(), e(".search-toggle").click((function(t) {
            e("div.king-search").find(".king-search-field").focus()
        })), e((function() {
            e('[data-toggle="tooltip"]').tooltip()
        })), e(".king-nightb").click((function(e) {
            e.stopPropagation()
        })), e("#modal-url").click((function() {
            e(this).focus(), e(this).select(), document.execCommand("copy"), e(this).next(".copied").show()
        })), s(), l(), e(".king-gallery-imgs").magnificPopup({
            delegate: "a",
            type: "image",
            closeOnContentClick: !1,
            closeBtnInside: !1,
            mainClass: "king-gallery-zoom",
            gallery: {
                enabled: !0
            },
            zoom: {
                enabled: !0,
                duration: 300,
                opener: function(e) {
                    return e.find("img")
                }
            }
        });
        var r = e(".owl-carousel");
        r.owlCarousel({
            nav: !0,
            dots: !1,
            margin: 14,
            mouseDrag: !1,
            loop: !1,
            items: 1,
            singleItem: !0,
            center: !0,
            animateOut: "slideOutDown",
            animateIn: "slideInDown",
            navContainerClass: "shorts-nav",
            navText: ['<i class="fa-solid fa-circle-chevron-up"></i>', '<i class="fa-solid fa-circle-chevron-down"></i>']
        }), r.on("translated.owl.carousel", (function(t) {
            e(".short-video").each((function() {
                videojs(this.id).ready((function() {
                    this.pause(), this.currentTime(0)
                }))
            })), e(".owl-item.active .short-video").each((function() {
                videojs(this.id).ready((function() {
                    this.play();
                    var e = localStorage.getItem("svolume");
                    null !== e && this.muted("true" === e)
                })), videojs(this.id).on("volumechange", (function() {
                    localStorage.setItem("svolume", this.muted())
                }))
            }))
        }));
        var c = document.querySelector(".short-video");
        c && videojs(c).on("volumechange", (function() {
            localStorage.setItem("svolume", this.muted())
        }));
        let d = document.getElementById("myRange"),
            u = document.getElementById("container"),
            g = document.getElementById("range-value");
        d && d.addEventListener("input", (function() {
            u.className = "column-" + this.value,
                function(e, t) {
                    let n = e.value,
                        i = e.min ? e.min : 1,
                        a = e.max ? e.max : 9,
                        o = Number(100 * (n - i) / (a - i));
                    t.innerHTML = n, t.style.left = `calc(${o}% + (${38-1.2*o}px))`
                }(d, g), n.reloadItems(), n.layout()
        }));
        let m = document.querySelector("header"),
            v = window.pageYOffset;

        function p() {
            var e = document.getElementById("copyp");
            e && e.addEventListener("click", (function() {
                var t = document.getElementById("prcontent").innerText;
                navigator.clipboard.writeText(t), e.innerHTML = '<i class="fa-solid fa-check"></i> Copied!', e.disabled = !0
            }))
        }
        window.addEventListener("scroll", (function() {
            let e = window.pageYOffset;
            v > e ? m.classList.add("scrolled-up") : m.classList.remove("scrolled-up"), v = e
        })), p();
        let f = document.getElementById("ltoggle"),
            h = document.getElementById("lmenu");
        f.addEventListener("click", (function() {
            h.classList.toggle("active")
        }))
    }))
}(jQuery);