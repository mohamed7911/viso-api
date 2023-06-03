module.exports = (text) => {
    function separateSentences(paragraph) {
        paragraph = paragraph.replace(/\n/g, " ");
      
        const sentences = paragraph.split(".");
      
        for (let i = 0; i < sentences.length; i++) {
          sentences[i] = `<div>${sentences[i]}</div>`;
        }
        return `${sentences}`;
      }


  return `${separateSentences(text)}`;
};
