// Мини-игра "Минг Бонг".
// *  Восстал монстр Минг Бонг! Храбрые борцы с монстрами спешат на помощь! Изначально Минг Бонг имеет 50 единиц здоровья.
// *  Каждый ход игры Минг Бонг выпивает магическое зелье, которое ему поставляет в неограниченном количестве злая колдунья Сардулья. Оно восстанавливает ему некое количество здоровья (вводит пользователь).
// *  Затем борцы с монстрами поливают его из антимонстропушкаруса, и это снимает ему некое количество здоровья (тоже вводит пользователь, каждый раз заново на каждом ходу). Затем начинается новый ход.
// *  Если в любой миг здоровье Минг Бонга превысит 100, то он поработит мир.
// *  Если в любой миг здоровье Минг Бонга упадет ниже 0, то он умирает, а Сардулья отправляется в тюрьму для злых колдуний.
// *  После того, как игра закончилась с любым исходом, показать статистику игры: кто победил, сколько ходов на это потребовалось, каков был максимальный нанесенный урон и какое максимальное количество здоровья было восстановлено, а также зафиксированный минимум и максимум здоровья монстра.

let monsterHealth = 50
let antimonsterDamage = 0
let monsterHealthMaxRestored = 0
let monsterHealthMinUnits = 0
let monsterHealthMaxUnits = 0
let antimonsterMaxDamage = 0
let round = 0

const formRestoreMonsterHealth = document.querySelector('[name="restoremingbonghealth"]');
const monsterHealthUnitsInput = document.querySelector('.form__number_mingbonghealthunits');

const formAddAntimonsterDamage = document.querySelector('[name="addantimonsterpowerdamage"]');
const antimonsterDamageUnitsInput = document.querySelector('.form__number_antimonsterdamageunits');

function handleFormRestoreMonsterHealthSubmit(evt){
  evt.preventDefault(evt);
  monsterHealth +=  parseInt(monsterHealthUnitsInput.value);
  console.log('mingBongHealth', monsterHealth);
}

function handleformAddAntimonsterDamageSubmit(evt) {
  evt.preventDefault(evt);
  antimonsterDamage +=  parseInt(antimonsterDamageUnitsInput.value);
  round += 1
  console.log('antimonsterDamage', antimonsterDamage);
  console.log('round', round);
}


formRestoreMonsterHealth.addEventListener('submit', handleFormRestoreMonsterHealthSubmit);
formAddAntimonsterDamage.addEventListener('submit', handleformAddAntimonsterDamageSubmit);

