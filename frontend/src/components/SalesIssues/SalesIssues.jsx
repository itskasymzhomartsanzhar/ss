import telegramIcon from '../../assets/telegram.png'
import appIcon from '../../assets/appicon.png'
import './SalesIssues.scss'

const cards = [
  {
    id: 'marketplaces',
    title: 'Маркетплейсы съедают маржу',
    text: 'Комиссии растут, а бренд теряется среди тысяч продавцов.',
    icon: 'badges',
  },
  {
    id: 'builders',
    title: 'Конструкторы магазинов ограничены',
    text: 'Нужного функционала нет, только шаблонные решения',
    icon: 'cross',
  },
  {
    id: 'traffic',
    title: 'Трафик становится все дороже',
    text: 'SEO и реклама требуют больших бюджетов',
    icon: 'google',
  },
  {
    id: 'mobile',
    title: 'Мобильное приложение слишком дорогое',
    text: 'Разработка может стоить сотни тысяч.',
    icon: 'phone',
  },
  {
    id: 'chats',
    title: 'Продажи идут через переписки',
    text: 'Клиенты пишут в ЛС, заказы обрабатываются вручную',
    icon: 'chat',
  },
  {
    id: 'telegram',
    title: 'Telegram-аудитория не монетизируется',
    text: 'Подписчики есть, но понятного способа продавать нет',
    icon: 'telegram',
  },
]

function renderIcon(type) {
  if (type === 'badges') {
    return (
      <span className="sales-issues__icon sales-issues__icon--app" aria-hidden="true">
        <img src={appIcon} alt="" />
      </span>
    )
  }

  if (type === 'cross') {
    return (
      <span className="sales-issues__icon" aria-hidden="true">

<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 0C7.83501 0 0 7.83501 0 17.5C0 27.165 7.83501 35 17.5 35C27.165 35 35 27.165 35 17.5C34.9895 7.83932 27.1607 0.010459 17.5 0ZM23.3333 21.2727C23.9259 21.8181 23.9642 22.7407 23.4188 23.3333C22.8733 23.9259 21.9507 23.9642 21.3581 23.4188C21.3285 23.3915 21.3 23.363 21.2727 23.3333L17.5 19.5621L13.7288 23.3333C13.1494 23.8928 12.2262 23.8768 11.6667 23.2974C11.1209 22.7323 11.1209 21.8364 11.6667 21.2712L15.4379 17.5L11.6667 13.7288C11.1072 13.1494 11.1232 12.2262 11.7026 11.6667C12.2677 11.1209 13.1636 11.1209 13.7288 11.6667L17.5 15.4379L21.2727 11.6667C21.8181 11.0741 22.7407 11.0358 23.3333 11.5812C23.9259 12.1267 23.9642 13.0493 23.4188 13.6419C23.3915 13.6715 23.363 13.7 23.3333 13.7273L19.5621 17.5L23.3333 21.2727Z" fill="#17D688"/>
</svg>
</span>
    )
  }

  if (type === 'google') {
    return (
      <span className="sales-issues__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path
            d="M23.49 12.27c0-.83-.07-1.63-.22-2.4H12v4.55h6.47a5.52 5.52 0 0 1-2.39 3.62v3.01h3.86c2.26-2.08 3.55-5.15 3.55-8.78Z"
            fill="#4285F4"
          />
          <path
            d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.86-3.01c-1.08.73-2.46 1.17-4.07 1.17-3.13 0-5.78-2.11-6.72-4.96H1.3v3.12A12 12 0 0 0 12 24Z"
            fill="#34A853"
          />
          <path
            d="M5.28 14.3a7.2 7.2 0 0 1 0-4.6V6.58H1.3a12 12 0 0 0 0 10.84l3.98-3.12Z"
            fill="#FBBC05"
          />
          <path
            d="M12 4.77c1.76 0 3.33.61 4.58 1.8l3.44-3.44C17.95 1.16 15.24 0 12 0 7.31 0 3.25 2.69 1.3 6.58l3.98 3.12C6.22 6.87 8.87 4.77 12 4.77Z"
            fill="#EA4335"
          />
        </svg>
      </span>
    )
  }

  if (type === 'phone') {
    return (
      <span className="sales-issues__icon" aria-hidden="true">
<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_18_54)">
<path d="M21.8751 0H13.1251C11.1919 0.00231563 9.33862 0.771286 7.97167 2.13824C6.60472 3.50519 5.83575 5.35851 5.83344 7.29167V23.3333H29.1668V7.29167C29.1645 5.35851 28.3955 3.50519 27.0285 2.13824C25.6616 0.771286 23.8083 0.00231563 21.8751 0V0Z" fill="#17D688"/>
<path d="M5.83344 27.7083C5.83575 29.6415 6.60472 31.4948 7.97167 32.8618C9.33862 34.2287 11.1919 34.9977 13.1251 35H21.8751C23.8083 34.9977 25.6616 34.2287 27.0285 32.8618C28.3955 31.4948 29.1645 29.6415 29.1668 27.7083V26.25H5.83344V27.7083ZM17.5001 29.1667C17.7885 29.1667 18.0705 29.2522 18.3103 29.4124C18.5501 29.5727 18.737 29.8004 18.8474 30.0669C18.9578 30.3334 18.9867 30.6266 18.9304 30.9095C18.8741 31.1924 18.7353 31.4522 18.5313 31.6562C18.3273 31.8602 18.0675 31.999 17.7846 32.0553C17.5017 32.1116 17.2085 32.0827 16.942 31.9723C16.6755 31.8619 16.4478 31.675 16.2875 31.4352C16.1273 31.1954 16.0418 30.9134 16.0418 30.625C16.0418 30.2382 16.1954 29.8673 16.4689 29.5938C16.7424 29.3203 17.1133 29.1667 17.5001 29.1667V29.1667Z" fill="#17D688"/>
</g>
<defs>
<clipPath id="clip0_18_54">
<rect width="35" height="35" fill="white"/>
</clipPath>
</defs>
</svg>

      </span>
    )
  }

  if (type === 'chat') {
    return (
      <span className="sales-issues__icon" aria-hidden="true">
<svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_18_49)">
<path d="M12.6875 26.2499H4.375C2.19771 26.2499 0 24.5962 0 20.9037V13.5537C0.0306646 10.2027 1.28541 6.97851 3.52797 4.4883C5.77052 1.9981 8.84613 0.413706 12.1756 0.0334712C14.0545 -0.10292 15.9407 0.166736 17.7061 0.824117C19.4714 1.4815 21.0746 2.5112 22.4067 3.84325C23.7387 5.1753 24.7684 6.77848 25.4258 8.54386C26.0832 10.3092 26.3528 12.1954 26.2165 14.0743C25.8357 17.4052 24.25 20.4818 21.758 22.7245C19.2661 24.9672 16.0399 26.2211 12.6875 26.2499ZM29.1667 13.2416H29.1492C29.1492 13.5872 29.1492 13.9328 29.1317 14.2799C28.5688 22.1666 21.3602 28.8428 13.2475 29.1389V29.1608C14.2692 30.9328 15.7389 32.4051 17.5091 33.4299C19.2793 34.4548 21.2879 34.9962 23.3333 34.9999H30.625C31.7853 34.9999 32.8981 34.539 33.7186 33.7185C34.5391 32.8981 35 31.7853 35 30.6249V23.3333C34.9979 21.2874 34.4578 19.278 33.434 17.5067C32.4101 15.7354 30.9385 14.2645 29.1667 13.2416Z" fill="#17D688"/>
</g>
<defs>
<clipPath id="clip0_18_49">
<rect width="35" height="35" fill="white"/>
</clipPath>
</defs>
</svg>

      </span>
    )
  }

  if (type === 'telegram') {
    return (
      <span className="sales-issues__icon sales-issues__icon--telegram" aria-hidden="true">
        <img src={telegramIcon} alt="" />
      </span>
    )
  }

  return null
}

export default function SalesIssues() {
  return (
    <section className="sales-issues">
      <div className="sales-issues__inner">
        <h2 className="sales-issues__title">
          Почему ваши онлайн-продажи <span>не растут?</span>
        </h2>

        <div className="sales-issues__grid">
          {cards.map((card) => (
            <article className="sales-issues__card" key={card.id}>
              <div className="sales-issues__icon-wrap">{renderIcon(card.icon)}</div>
              <h3 className="sales-issues__card-title">{card.title}</h3>
              <p className="sales-issues__card-text">{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
