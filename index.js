const firebase = require('firebase/app'); // Importing the Firebase App

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrJw3sMkveH89z6qRvlzxw2L2vwaCKEW4",
  authDomain: "monke-inventory.firebaseapp.com",
  projectId: "monke-inventory",
  storageBucket: "monke-inventory.appspot.com",
  messagingSenderId: "281878113432",
  appId: "1:281878113432:web:1333912e11a91a4476b4ed"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Upload Button Functionality
function uploadButton() {
  document.getElementById('imageInput').click();
}

const form = document.getElementById('imageUploadForm');
const fileInput = document.getElementById('imageInput');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log('Submitting form');
  const file = fileInput.files[0];
  
  const formData = new FormData();
  formData.append('file', file);
  
  fetch('http://43.205.216.220:4200/inventoryUpload', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to upload file');
  })
  .then(data => {
    console.log('File was uploaded successfully', data);
  })
  .catch(error => {
    console.error(error);
  });
});
