// Мини-игра "Минг Бонг".
// *  Восстал монстр Минг Бонг! Храбрые борцы с монстрами спешат на помощь! Изначально Минг Бонг имеет 50 единиц здоровья.
// *  Каждый ход игры Минг Бонг выпивает магическое зелье, которое ему поставляет в неограниченном количестве злая колдунья Сардулья. Оно восстанавливает ему некое количество здоровья (вводит пользователь).
// *  Затем борцы с монстрами поливают его из антимонстропушкаруса, и это снимает ему некое количество здоровья (тоже вводит пользователь, каждый раз заново на каждом ходу). Затем начинается новый ход.
// *  Если в любой миг здоровье Минг Бонга превысит 100, то он поработит мир.
// *  Если в любой миг здоровье Минг Бонга упадет ниже 0, то он умирает, а Сардулья отправляется в тюрьму для злых колдуний.
// *  После того, как игра закончилась с любым исходом, показать статистику игры: кто победил, сколько ходов на это потребовалось, каков был максимальный нанесенный урон и какое максимальное количество здоровья было восстановлено, а также зафиксированный минимум и максимум здоровья монстра.

let monsterHealth = 50;
let monsterHealthMaxRestored = 0;
let monsterHealthMinUnits = 1;
let monsterHealthMaxUnits = 0;
let antimonsterMaxDamage = 0;
let rounds = 0;

const startBtn = document.querySelector(".start__btn");
const startOverBtn = document.querySelector(".endplay__startover_btn");
const formRestoreMonsterHealth = document.querySelector('[name="restoremingbonghealth"]');
const monsterHealthUnitsInput = document.querySelector(".form__number_mingbonghealthunits");
const formAddAntimonsterDamage = document.querySelector('[name="addantimonsterpowerdamage"]');
const antimonsterDamageUnitsInput = document.querySelector(".form__number_antimonsterdamageunits");
const statAntimonsterMaxDamage = document.querySelector(".ednplay__stats_antimonster_max-damage");
const statMonsterHealthMaxRestored = document.querySelector(".ednplay__stats_monsterhealth-max-restored");
const statMonsterHealthMinUnits = document.querySelector(".ednplay__stats_monsterhealth-min_units");
const statsMonsterHealthMaxUnits = document.querySelector(".ednplay__stats_monsterhealth-max-units");
const screenStart = document.querySelector(".start");
const screenMonsterPlay = document.querySelector(".play__ming-bong");
const screenAntiMonsterPlay = document.querySelector(".play__antimonster");
const screenGameOver = document.querySelector(".endplay");

function handleFormRestoreMonsterHealthSubmit(evt) {
  evt.preventDefault(evt);
  const monsterHealthUnitsInputValue = parseInt(monsterHealthUnitsInput.value);
  monsterHealth += monsterHealthUnitsInputValue;
  monsterHealthMaxRestored += monsterHealthUnitsInputValue;
  document.querySelector(".monsterhealth-units").innerHTML = monsterHealth;
  monsterHealthMinUnits = Math.min(
    monsterHealthMaxUnits,
    monsterHealthUnitsInputValue
  );
  monsterHealthMaxUnits = Math.max(
    monsterHealthMaxUnits,
    monsterHealthUnitsInputValue
  );
  checkWinner(screenMonsterPlay, function () {
    nextScreen(screenMonsterPlay, screenAntiMonsterPlay);
  });
}

function handleformAddAntimonsterDamageSubmit(evt) {
  evt.preventDefault(evt);
  monsterHealth -= parseInt(antimonsterDamageUnitsInput.value);
  rounds += 1;
  checkWinner(screenAntiMonsterPlay, function () {
    nextScreen(screenAntiMonsterPlay, screenMonsterPlay);
  });
}

function checkWinner(currentScreen, callback) {
  if (gameOver()) {
    screenGameOver.classList.toggle("hidden");
    if (monsterHealth > 100) {
      nextScreen(
        currentScreen,
        document.querySelector(".endplay__content_monster-win")
      );
      document.querySelector(".endplay__stats_rounds_monster").innerHTML = rounds + composeRoundMessage(rounds);
    }
    if (monsterHealth <= 0) {
      nextScreen(
        currentScreen,
        document.querySelector(".endplay__content_antimonster-win")
      );
      document.querySelector(".endplay__stats_rounds_antimonster").innerHTML = rounds + composeRoundMessage(rounds);
    }
  } else {
    callback();
  }
}

function gameOver() {
  if (monsterHealth > 0 && monsterHealth < 100) {
    return false;
  }
  statAntimonsterMaxDamage.innerHTML = antimonsterDamageUnitsInput.value;
  statMonsterHealthMaxRestored.innerHTML = monsterHealthMaxRestored;
  statMonsterHealthMinUnits.innerHTML = monsterHealthMinUnits;
  statsMonsterHealthMaxUnits.innerHTML = monsterHealthMaxUnits;
  return true;
}

function nextScreen(currentElement, nextElement) {
  currentElement.classList.toggle("hidden");
  nextElement.classList.toggle("hidden");
}

function composeRoundMessage(num) {
  if (num == 1) {
    roundsMessage = "&nbspраунд";
  } else if (num == 2 || num == 3 || num == 4) {
    roundsMessage = "&nbspраунда";
  } else {
    roundsMessage = "&nbspраундов";
  }
  return roundsMessage;
}

function restartGame() {
  window.location.reload();
}

startBtn.addEventListener("click", function () {
  nextScreen(screenStart, screenMonsterPlay);
});
formRestoreMonsterHealth.addEventListener(
  "submit",
  handleFormRestoreMonsterHealthSubmit
);
formAddAntimonsterDamage.addEventListener(
  "submit",
  handleformAddAntimonsterDamageSubmit
);
startOverBtn.addEventListener("click", restartGame);
