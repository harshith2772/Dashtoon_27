document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('comicForm');
    const inputFields = document.getElementById('inputFields');
    
    for (let i = 1; i <= 10; i++) {
        let textarea = document.createElement('textarea');
        textarea.name = 'panel' + i;
        textarea.placeholder = 'Enter story for panel ' + i;
        textarea.required = true;
        textarea.rows = 4;
        textarea.cols = 50;
        inputFields.appendChild(textarea);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        generateComicStrip();
    });
});

async function generateComicStrip() {
    const formData = new FormData(document.getElementById('comicForm'));
    const comicStrip = document.getElementById('comicStrip');
    comicStrip.innerHTML = '';

    for (let [key, value] of formData.entries()) {
        try {
            let transformObject = {
                inputs: value
            };
            const response = await fetch(
                "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
                {
                    headers: { 
                        "Accept": "image/png",
                        "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                        "Content-Type": "application/json" 
                    },
                    method: "POST",
                    body: JSON.stringify(transformObject),
                }
            );

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const result = await response.blob();
            let img = document.createElement('img');
            img.src = URL.createObjectURL(result); 
            comicStrip.appendChild(img);
        } catch (error) {
            console.error('Error generating comic strip:', error);
        }
    }
}
