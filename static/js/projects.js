document.addEventListener('DOMContentLoaded', function() {
    const fileUpload = document.getElementById('file-upload');
    const mediaPreview = document.getElementById('media-preview');
    const fileList = document.getElementById('file-list');
    let currentMediaIndex = 0;
    let mediaFiles = [];

    // Handle file selection
    fileUpload.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Add new files to the mediaFiles array
        mediaFiles = [...mediaFiles, ...files];
        
        // Display the first file in the preview
        if (mediaFiles.length > 0) {
            displayMedia(mediaFiles[0]);
            updateFileList();
        }
    });

    // Display media (image or video) in the preview
    function displayMedia(file) {
        mediaPreview.innerHTML = '';
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.alt = 'Preview';
            img.className = 'project-media';
            mediaPreview.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.className = 'project-media';
            mediaPreview.appendChild(video);
        }
    }

    // Update the file list display
    function updateFileList() {
        fileList.innerHTML = '';
        
        mediaFiles.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            
            const fileIcon = document.createElement('i');
            fileIcon.className = file.type.startsWith('image/') ? 'fas fa-image' : 'fas fa-video';
            
            const fileName = document.createElement('span');
            fileName.className = 'file-name';
            fileName.textContent = file.name;
            
            const fileSize = document.createElement('span');
            fileSize.className = 'file-size';
            fileSize.textContent = formatFileSize(file.size);
            
            const removeBtn = document.createElement('button');
            removeBtn.className = 'remove-file';
            removeBtn.innerHTML = '&times;';
            removeBtn.onclick = (e) => {
                e.stopPropagation();
                removeFile(index);
            };
            
            fileItem.appendChild(fileIcon);
            fileItem.appendChild(fileName);
            fileItem.appendChild(fileSize);
            fileItem.appendChild(removeBtn);
            
            // Make file item clickable to preview
            fileItem.onclick = () => {
                currentMediaIndex = index;
                displayMedia(mediaFiles[index]);
            };
            
            fileList.appendChild(fileItem);
        });
    }

    // Remove a file from the list
    function removeFile(index) {
        mediaFiles.splice(index, 1);
        
        if (mediaFiles.length === 0) {
            mediaPreview.innerHTML = '<p>No media selected</p>';
            fileList.innerHTML = '';
            return;
        }
        
        // Adjust currentMediaIndex if needed
        if (currentMediaIndex >= mediaFiles.length) {
            currentMediaIndex = mediaFiles.length - 1;
        }
        
        // Display the current or next media
        displayMedia(mediaFiles[currentMediaIndex]);
        updateFileList();
    }

    // Format file size
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Handle drag and drop
    const dropArea = document.querySelector('.upload-label');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    // Handle dropped files
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length) {
            fileUpload.files = files;
            const event = new Event('change');
            fileUpload.dispatchEvent(event);
        }
    }

    // Project navigation
    const prevBtn = document.getElementById('prev-project');
    const nextBtn = document.getElementById('next-project');
    const projectCounter = document.querySelector('.project-counter');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => navigateProjects(-1));
        nextBtn.addEventListener('click', () => navigateProjects(1));
    }
    
    function navigateProjects(direction) {
        // This is a placeholder - you would typically load different project data here
        console.log(`Navigating projects: ${direction > 0 ? 'next' : 'previous'}`);
        // Update project counter, content, etc.
    }
});
