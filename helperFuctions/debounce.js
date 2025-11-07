export default function debounce(fn, delay) {
    
    let timer;
    console.log('debounce in');
   
    return (() => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(), delay);
      })();
}
