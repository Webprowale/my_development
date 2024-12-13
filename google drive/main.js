
  function loadClient() {
    gapi.client.setApiKey('YOUR_API_KEY');
    return gapi.client.load('https://content.googleapis.com/discovery/v1/apis/drive/v3/rest')
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }

  function loadGapiClient() {
    gapi.load("client:auth2", function() {
      gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
    });
  }
  gapi.load("client:auth2", loadClient);

  let currentPageToken = '';
  let nextPageToken = '';

  function listVideos(pageToken = '') {
    return gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name, mimeType, webViewLink, thumbnailLink)",
      'q': "mimeType contains 'video/'",
      'pageToken': pageToken
    }).then(function(response) {
      return response.result;
    });
  }

  function displayVideos(videos) {
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';
    videos.forEach(video => {
      const videoElement = document.createElement('div');
      videoElement.innerHTML = `
        <h3>${video.name}</h3>
        <a href="${video.webViewLink}" target="_blank">
          <img src="${video.thumbnailLink}" alt="${video.name}">
        </a>
      `;
      videoContainer.appendChild(videoElement);
    });
  }

  function loadVideos() {
    listVideos(currentPageToken).then(response => {
      displayVideos(response.files);
      nextPageToken = response.nextPageToken || '';
      document.getElementById('next-button').style.display = nextPageToken ? 'block' : 'none';
    });
  }

  function nextPage() {
    currentPageToken = nextPageToken;
    loadVideos();
  }

  document.getElementById('next-button').addEventListener('click', nextPage);

  // Initial load
  loadVideos();

