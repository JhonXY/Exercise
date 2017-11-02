
var subjects = document.getElementsByClassName('subject-rate')

Array.from(subjects).forEach((item, index) => {
  var grade = parseFloat(item.innerHTML)
  switch (true) {
    case grade === 0:
      item.previousElementSibling.style['background-position'] = '0 -110px';
      break;
    case 0 < grade && grade <= 1:
      item.previousElementSibling.style['background-position'] = '0 -99px';
      break;
    case 1 < grade && grade <= 2:
      item.previousElementSibling.style['background-position'] = '0 -88px';
      break;
    case 2 < grade && grade <= 3:
      item.previousElementSibling.style['background-position'] = '0 -77px';
      break;
    case 3 < grade && grade <= 4:
      item.previousElementSibling.style['background-position'] = '0 -66px';
      break;
    case 4 < grade && grade <= 5:
      item.previousElementSibling.style['background-position'] = '0 -55px';
      break;
    case 5 < grade && grade <= 6:
      item.previousElementSibling.style['background-position'] = '0 -44px';
      break;
    case 6 < grade && grade <= 7:
      item.previousElementSibling.style['background-position'] = '0 -33px';
      break;
    case 7 < grade && grade <= 8:
      item.previousElementSibling.style['background-position'] = '0 -22px';
      break;
    case 8 < grade && grade <= 9:
      item.previousElementSibling.style['background-position'] = '0 -11px';
      break;
    case 9 < grade && grade <= 10:
      item.previousElementSibling.style['background-position'] = '0 0px';
      break;
  }
})
