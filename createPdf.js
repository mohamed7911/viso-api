module.exports = (text) => {
    // const textPro = text.split('.').map(e=>{
    //     return `<div>${e}</div>`
    // })
    function separateSentences(paragraph) {
        // Replace any line breaks within the paragraph with a space
        paragraph = paragraph.replace(/\n/g, " ");
      
        // Split the paragraph into sentences based on periods
        const sentences = paragraph.split(". ");
      
        // Add a period back to each sentence
        for (let i = 0; i < sentences.length; i++) {
          sentences[i] = `<td>${sentences[i]}</td>`;
        }
      
        // Join the sentences with a line break
        // const result = sentences.join("\n");
      
        return `${sentences}`;
      }


  return `${separateSentences(text)}`;
};
