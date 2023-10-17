export function convertNumberToWords(number) {
    
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const crore = 'Crore';
    const lakh = 'Lakh';
    const arab = 'Arab';
    const currency = 'Rupees';
    const paisa = 'Paisa';
    if (number === 0) {
        return 'Zero ' + currency;
      }
    
      let words = '';
    
      if (number >= 10000000) {
        words += convertNumberToWords(Math.floor(number / 10000000)) + ' ' + crore + ' ';
        number %= 10000000;
      }
    
      if (number >= 100000) {
        words += convertNumberToWords(Math.floor(number / 100000)) + ' ' + lakh + ' ';
        number %= 100000;
      }
    
      if (number >= 1000) {
        words += convertNumberToWords(Math.floor(number / 1000)) + ' Thousand ';
        number %= 1000;
      }
    
      if (number >= 100) {
        words += convertNumberToWords(Math.floor(number / 100)) + ' Hundred ';
        number %= 100;
      }
    
      if (number >= 20) {
        words += tens[Math.floor(number / 10)] + ' ';
        number %= 10;
      } else if (number >= 10) {
        words += teens[number - 10] + ' ';
        number = 0;
      }
    
      if (number > 0) {
        words += units[number] + ' ';
      }
      const decimalPart = Math.round((number % 1) * 100); // Extract the decimal part and convert it to paisa
  if (decimalPart > 0) {
    words += decimalPart + ' ' + paisa + ' ';
  }
    
      return words.trim()+' '+currency;
    }
  
  //let grandTotal = 9956892; // Example value
  //let amountWord = convertNumberToWords(grandTotal) + ' Rupees Only';