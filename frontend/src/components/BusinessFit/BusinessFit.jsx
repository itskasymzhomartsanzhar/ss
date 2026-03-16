import type1 from '../../assets/type1.png'
import type2 from '../../assets/type2.png'
import type3 from '../../assets/type3.png'
import type4 from '../../assets/type4.png'
import './BusinessFit.scss'

const cards = [
  {
    id: 'online',
    title: 'Онлайн-магазины и бренды',
    text: 'Расширьте каналы продаж без сайта и приложения',
    icon: type1,
  },
  {
    id: 'retail',
    title: 'Локальный ритейл и офлайн-точки',
    text: 'Выходите в онлайн и продавайте напрямую своим клиентам',
    icon: type2,
  },
  {
    id: 'beauty',
    title: 'Бьюти, косметика и услуги',
    text: 'Создавайте удобный путь покупки для клиентов',
    icon: type3,
  },
  {
    id: 'influencers',
    title: 'Инфлюенсеры и блогеры',
    text: 'Оформляйте заказы и принимайте оплату прямо в мессенджере',
    icon: type4,
  },
]

export default function BusinessFit() {
  return (
    <section className="business-fit" id="audience">
      <div className="business-fit__inner">
        <h2 className="business-fit__title">
          Решение подходит для любого бизнеса, который хочет{' '}
          <span>начать продавать в Telegram</span>
        </h2>

        <div className="business-fit__grid">
          {cards.map((card) => (
            <article className="business-fit__card" key={card.id}>
              <div className="business-fit__icon" aria-hidden="true">
                <img src={card.icon} alt="" aria-hidden="true" />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
