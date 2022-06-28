let currentMoney = 60
let moneyPerContract = 0
let moneyPerSec = 0
let totalEarnedMoney = 0
let moneyPerSecMultiple = 1
let isInitial
let lvl = 1

let overlayMessage = document.querySelectorAll('.overlay.message-popup .message')

overlayMessage.forEach(item => {
    item.querySelector('.close').onclick = () => {
        item.closest('.message-popup').classList.add('disable')
        item.classList.remove('active')
    }
})

class powerUp {
    constructor(name, cost, moneyPerContract, moneyPerSec, amount) {
        this.name = name 
        this.cost = cost
        this.moneyPerContract = moneyPerContract
        this.moneyPerSec = moneyPerSec
        this.amount = amount
    }
    buyPowerUp() {
        if (this.cost <= currentMoney) {
            // disable welcome message 
            if (isInitial) {
                isInitial = false
                document.querySelectorAll('.welcome').forEach(item => item.classList.add('disable'))
            }

            // decrease current money 
            currentMoney = currentMoney - this.cost
            document.querySelector('.currentMoney span').innerHTML = currentMoney

            // increase money per contract 
            moneyPerContract = moneyPerContract + this.moneyPerContract
            document.querySelector('.button .desc span').innerHTML = moneyPerContract
            document.querySelector('.total-info-block .moneyPerContract span').innerHTML = moneyPerContract

            // increase money per second 
            moneyPerSec = moneyPerSec + this.moneyPerSec
            document.querySelector('.total-info-block .moneyPerSec span').innerHTML = moneyPerSec * moneyPerSecMultiple

            // increase powerup amount
            let obj = document.querySelector('[data-powerup="' + this.name + '"]')
            this.amount = ++this.amount
            obj.querySelector('.amount span').innerHTML = this.amount

            // increase powerup cost 
            this.cost = Math.round(this.cost * 1.2)
            obj.querySelector('.desc span').innerHTML = this.cost

            // update info block 
            let info = document.querySelector('.total-info-block .' + this.name)
            info.querySelector('span').innerHTML = this.amount

            // Add events 
            if (this.name == 'junior' && this.amount == 1) {
                setInterval(eventPerMin, 60000)
            } else if (this.name == 'junior' && this.amount == 10) {
                events.push({
                        title: 'Джуни щось зламали',
                        text: 'Здається, 10 джунів - забагато. Вони зламали вам гіт, зіпсував великий проект. Ви втрачаєте 1000 гривень.',
                        buttonText: 'От нездарі',
                        operation: 'plus',
                        factor: -1000
                })
            } else if (this.name == 'designer' && this.amount == 6) {
                events.push({
                        title: 'Дизайнери хочуть нові монітори',
                        text: 'Дизайнери заявили, що на старих моніторах кольори не такі кольорові, а лінії не такі лінейні. Дизайнерські монітори обійдуться вам у 1500 гривень.',
                        buttonText: 'От халепа',
                        operation: 'plus',
                        factor: -1500
                })
            } else if (this.name == 'designer' && this.amount == 10) {
                events.push({
                        title: 'Дизайнери змінили сайт',
                        text: 'Ваш штат дизайнерів прийшов до висновку, що старий сайт повний відстій. Зробили новий, що коштувало вам 2000 гривень.',
                        buttonText: 'От халепа',
                        operation: 'plus',
                        factor: -200
                })
            } else if (this.name == 'middle' && this.amount == 10) {
                events.push({
                        title: 'Мідли придумали стартап',
                        text: 'Мідли придумали стартап, на якому ви заробили додаткові 3000 гривень.',
                        buttonText: 'Краса',
                        operation: 'plus',
                        factor: 3000
                })
            } else if (this.name == 'senior' && this.amount == 10) {
                events.push({
                        title: 'Сеньори взламали пентогон',
                        text: 'На відкуп від ЦРУ пішли 5000 гривень.',
                        buttonText: 'От падло',
                        operation: 'plus',
                        factor: -5000
                })
            } else if (this.name == 'fullstack' && this.amount == 3) {
                events.push({
                        title: 'Фулстаки перелаялися',
                        text: 'Ідейні розбужності дали про себе знати. На відновлення їх психічного стану (спа, відпустки, піздюлі) пішли 10 000 гривень.',
                        buttonText: 'От нездари',
                        operation: 'plus',
                        factor: -10000
                })
            } else if (this.name == 'fullstack' && this.amount == 6) {
                events.push({
                        title: 'Фулстаки взламали сайт ФСБ',
                        text: 'Грант від Зеленського - 15 000 гривень.',
                        buttonText: 'От нездари',
                        operation: 'plus',
                        factor: -15000
                })
            }
        }
    }
}


class bonus {
    constructor(name, cost, amount, bonus, maximum) {
        this.name = name
        this.cost = cost
        this.amount = amount
        this.bonus = bonus
        this.maximum = maximum
    }
    buyBonus() {
        if (this.cost <= currentMoney) {
            if (this.maximum > this.amount) {
                // decrease current money 
                currentMoney = currentMoney - this.cost
                document.querySelector('.currentMoney span').innerHTML = currentMoney

                // increase powerup amount
                let obj = document.querySelector('[data-powerup="' + this.name + '"]')
                this.amount = ++this.amount
                obj.querySelector('.amount span').innerHTML = this.amount

                if (this.name == 'udemy') {
                    // change junior money per contract 
                    moneyPerContract = moneyPerContract - junior.amount + (junior.amount * this.bonus)
                    junior.moneyPerContract = junior.moneyPerContract * this.bonus
                    document.querySelector('.button .desc span').innerHTML = moneyPerContract
                    document.querySelector('.total-info-block .moneyPerContract span').innerHTML = moneyPerContract
                    document.querySelector('[data-powerup="junior"] .powerup-desc-perContract span').innerHTML = junior.moneyPerContract
                }

                if (this.name == 'cofe') {
                    // increase money per second multiple 
                    moneyPerSecMultiple = moneyPerSecMultiple + this.bonus
                    document.querySelector('.total-info-block .moneyPerSec span').innerHTML = moneyPerSec * moneyPerSecMultiple
                    document.querySelector('[data-powerup="middle"] .powerup-desc-perSec span').innerHTML = middle.moneyPerSec * moneyPerSecMultiple
                    document.querySelector('[data-powerup="designer"] .powerup-desc-perSec span').innerHTML = designer.moneyPerSec  * moneyPerSecMultiple
                    document.querySelector('[data-powerup="senior"] .powerup-desc-perSec span').innerHTML = senior.moneyPerSec * moneyPerSecMultiple
                    document.querySelector('[data-powerup="fullstack"] .powerup-desc-perSec span').innerHTML = fullstack.moneyPerSec * moneyPerSecMultiple
                }

                if (this.name == 'relax') {
                    // increase money per contract multiple 
                    moneyPerContract = moneyPerContract * this.bonus 
                    document.querySelector('.button .desc span').innerHTML = moneyPerContract
                    document.querySelector('.total-info-block .moneyPerContract span').innerHTML = moneyPerContract
                    junior.moneyPerContract = junior.moneyPerContract * this.bonus
                    document.querySelector('[data-powerup="junior"] .powerup-desc-perContract span').innerHTML = junior.moneyPerContract
                    middle.moneyPerContract = middle.moneyPerContract * this.bonus
                    document.querySelector('[data-powerup="middle"] .powerup-desc-perContract span').innerHTML = middle.moneyPerContract
                    designer.moneyPerContract = designer.moneyPerContract * this.bonus
                    document.querySelector('[data-powerup="designer"] .powerup-desc-perContract span').innerHTML = designer.moneyPerContract
                    senior.moneyPerContract = senior.moneyPerContract * this.bonus
                    document.querySelector('[data-powerup="senior"] .powerup-desc-perContract span').innerHTML = senior.moneyPerContract
                    fullstack.moneyPerContract = fullstack.moneyPerContract * this.bonus
                    document.querySelector('[data-powerup="fullstack"] .powerup-desc-perContract span').innerHTML = fullstack.moneyPerContract
                }

                if (this.name == 'shawerma') {
                    // decrease newmembers cost 
                    junior.cost = Math.round(junior.cost * this.bonus)
                    document.querySelector('[data-powerup="junior"] .desc span').innerHTML = junior.cost
                    middle.cost = Math.round(middle.cost * this.bonus)
                    document.querySelector('[data-powerup="middle"] .desc span').innerHTML = middle.cost
                    designer.cost = Math.round(designer.cost * this.bonus)
                    document.querySelector('[data-powerup="designer"] .desc span').innerHTML = designer.cost
                    senior.cost = Math.round(senior.cost * this.bonus)
                    document.querySelector('[data-powerup="senior"] .desc span').innerHTML = senior.cost
                    fullstack.cost = Math.round(fullstack.cost * this.bonus)
                    document.querySelector('[data-powerup="fullstack"] .desc span').innerHTML = fullstack.cost
                }

                if (this.name == 'relocate') { 
                    document.querySelector('.overlay.message-popup').classList.remove('disable')
                    document.querySelector('.overlay.message-popup .capital').classList.add('active')
                }

            } else {
                let obj = document.querySelector('[data-powerup="' + this.name + '"]')
                obj.classList.add('maximum')
                setTimeout(() => obj.classList.remove('maximum'), 1000)
            }

        }
    }
}

// name, cost, moneyPerContract, moneyPerSec, amount
let junior = new powerUp('junior', 60, 1, 0, 0)
let designer = new powerUp('designer', 300, 2, 1, 0)
let middle = new powerUp('middle', 600, 3, 2, 0)
let senior = new powerUp('senior', 2000, 7, 4, 0)
let fullstack = new powerUp('fullstack', 5000, 15, 6, 0)
// name, cost amount, bonus, maximum 
let udemy = new bonus('udemy', 1000, 0, 2, 1)
let cofe = new bonus('cofe', 5000, 0, 1, 1)
let relax = new bonus('relax', 5000, 0, 2, 1)
let shawerma = new bonus('shawerma', 10000, 0, 0.5, 1)
let relocate = new bonus('relocate', 30000, 0, 0, 1)



let takeContractButton = document.querySelector('.button')

takeContractButton.onclick = () => {
    // enable welcome message if no money per contract
    if (moneyPerContract == 0) {
        document.querySelectorAll('.welcome').forEach(item => item.classList.remove('disable'))
        isInitial = true
    }

    // increase current money
    currentMoney = currentMoney + moneyPerContract
    document.querySelector('.currentMoney span').innerHTML = currentMoney

    // increase total earned money 
    totalEarnedMoney = totalEarnedMoney + moneyPerContract
    document.querySelector('.totalEarnedMoney span').innerHTML = totalEarnedMoney
}

function eventPerSec() {
    // increase current money
    currentMoney = currentMoney + (moneyPerSec * moneyPerSecMultiple)
    document.querySelector('.currentMoney span').innerHTML = currentMoney
    
    // increase total earned money 
    totalEarnedMoney = totalEarnedMoney + (moneyPerSec * moneyPerSecMultiple)
    document.querySelector('.totalEarnedMoney span').innerHTML = totalEarnedMoney

    // check total money for lvl increase 
    if (totalEarnedMoney > 20000 && lvl == 1) {
        lvl = 2
        document.querySelector('.desc span').innerHTML = 'Нас знають місцеві підприємці!'
        document.querySelector('.overlay.message-popup').classList.remove('disable')
        document.querySelector('.message-popup .lvl2').classList.add('active')
        takeContractButton.classList.add('lvl2')
    } else if (totalEarnedMoney > 50000 && lvl == 2 ) {
        lvl = 3
        document.querySelector('.desc span').innerHTML = 'Ого! Нас знають навіть за кордоном!'
        document.querySelector('.overlay.message-popup').classList.remove('disable')
        document.querySelector('.message-popup .lvl3').classList.add('active')
        takeContractButton.classList.remove('lvl2')
        takeContractButton.classList.add('lvl3')
    } else if (totalEarnedMoney > 100000 && lvl == 3 ) {
        lvl = 4
        document.querySelector('.desc span').innerHTML = 'У нас замовив сайт Притула!'
        document.querySelector('.overlay.message-popup').classList.remove('disable')
        document.querySelector('.message-popup .lvl4').classList.add('active')
        takeContractButton.classList.remove('lvl3')
        takeContractButton.classList.add('lvl4')
    }

}

function eventPerMin() {
    // random event every min
    let numb = Math.floor(Math.random() * events.length)
    function event (title, text, buttonText, operation, factor) {
        document.querySelector('.overlay.message-popup').classList.remove('disable')
        document.querySelector('.message-popup .event').classList.add('active')
        document.querySelector('.message-popup .event .title').innerHTML = title
        document.querySelector('.message-popup .event .text').innerHTML = text
        document.querySelector('.message-popup .event .close').innerHTML = buttonText
        if(operation == 'plus') {
            currentMoney = currentMoney + factor
        } else if (operation == 'multiple') {
            currentMoney = Math.round(currentMoney * factor)
        }
        
    }
    if (document.querySelector('.overlay.message-popup').classList.contains('disable')) {
        event(events[numb].title, events[numb].text, events[numb].buttonText, events[numb].operation, events[numb].factor)
    }
}


let events = [
    {
        title: 'Чудова робота!',
        text: 'Один з заказників настільки задоволений роботою, що заплатив на 100 гривень більше.',
        buttonText: 'Найс',
        operation: 'plus',
        factor: 100
    }, 
    {
        title: 'Відпустки!',
        text: 'Віявляється, людям інколи потрібно відпочивати, а ви зовсім забули про цей фактор. На відпустки для працівників пішла третина ваших грошей.',
        buttonText: 'А працювати хто буде?',
        operation: 'multiple',
        factor: 0.66
    }, 
    {
        title: 'Рефанд!',
        text: 'Заказник незадоволений вашою работою, 300 гривень пішло на рефанд.',
        buttonText: 'Що за невдача',
        operation: 'plus',
        factor: -300
    },
    {
        title: 'Ремонт в офісі',
        text: 'Гарна новина: тепер в вас класний ремонт. Погана - на це пішли усі гроші',
        buttonText: 'Ще заробимо',
        operation: 'multiple',
        factor: 0
    },
    {
        title: 'Корпоратив',
        text: 'Що поробиш, дружня атмосфера це важливо. Дружня атмосфера коштувала вам 200 гривень.',
        buttonText: 'Ще заробимо',
        operation: 'plus',
        factor: -200
    },
    {
        title: 'Шабашка',
        text: 'Знайомий з мерії попросив зробити сайт, легкі 300 гривень.',
        buttonText: 'Найс',
        operation: 'plus',
        factor: 300
    },
    {
        title: 'Оплата хостингу',
        text: 'Що поробиш, штука потрібна. Усього 200 гривень.',
        buttonText: 'Ще заробимо',
        operation: 'plus',
        factor: -200
    },
    {
        title: 'Кіднепінг',
        text: 'Невідомі вкрали вашого офіс-менеджера, на викуп пішла половина ваших грошей.',
        buttonText: 'Ще заробимо',
        operation: 'multiple',
        factor: 0.5
    },
    {
        title: 'Вдалий вклад',
        text: 'Ви вдало вклали гроші у біткоїни, збільшив їх у півтора рази.',
        buttonText: 'Найс',
        operation: 'multiple',
        factor: 1.5
    },
    {
        title: 'Недалий вклад',
        text: 'Ви невдало вклали гроші у біткоїни, зменшив їх у половину',
        buttonText: 'Найс',
        operation: 'multiple',
        factor: 0.5
    }
]



setInterval(eventPerSec, 1000)
