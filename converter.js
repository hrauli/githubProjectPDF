document.getElementById('convertBtn').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
          const pdf = new jsPDF();
          const imageData = canvas.toDataURL('image/jpeg');
  
          // Add image to the page
          document.getElementById('selectedImage').src = imageData;
  
          pdf.addImage(imageData, 'JPEG', 0, 0, img.width * 0.75, img.height * 0.75);
  
          // Show the PDF
          const pdfData = pdf.output('datauristring');
          document.getElementById('pdfEmbed').src = pdfData;
          document.getElementById('pdfContainer').style.display = 'block';
  
          // Download PDF
          const downloadLink = document.getElementById('downloadLink');
          downloadLink.href = pdfData;
          downloadLink.style.display = 'block';
        };
  
        img.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    }
  });
  