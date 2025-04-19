document.getElementById('uploadBtn').addEventListener('click', function() {
  const fileInput = document.getElementById('fileInput');
  const fileStatus = document.getElementById('fileStatus');
  const fileList = document.getElementById('fileList');

  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const listItem = document.createElement('li');
    listItem.textContent = file.name;
    fileList.appendChild(listItem);

    fileStatus.textContent = `Bestand '${file.name}' is succesvol geüpload!`;
    fileStatus.style.color = 'green';

    // Reset file input
    fileInput.value = '';
  } else {
    fileStatus.textContent = 'Selecteer een bestand om te uploaden.';
    fileStatus.style.color = 'red';
  }
});

document.getElementById('commentBtn').addEventListener('click', function() {
  const commentInput = document.getElementById('commentInput');
  const commentsList = document.getElementById('commentsList');

  if (commentInput.value.trim() !== '') {
    const commentItem = document.createElement('li');
    commentItem.textContent = commentInput.value;
    commentsList.appendChild(commentItem);

    commentInput.value = '';  // Reset textarea
  } else {
    alert('Voer een reactie in!');
  }
});
