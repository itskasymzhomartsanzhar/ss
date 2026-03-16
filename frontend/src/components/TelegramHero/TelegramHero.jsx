import mainImage from '../../assets/mainimg.png'
import telegramicon from '../../assets/telegram.png'
import testButtonIcon from '../../assets/testbtn.webp'
import './TelegramHero.scss'

const benefits = [
  {
    before: 'Внедрение магазина за ',
    highlighted: '2-5 дней',
    after: ' под ключ',
  },
  {
    before: 'Дизайн и структура под ',
    highlighted: 'ваш бренд и нишу',
    after: '',
  },
  {
    before: 'Больше продаж через ',
    highlighted: 'теплую аудиторию',
    after: ' Telegram',
  },
]

export default function TelegramHero() {
  return (
    <section className="telegram-hero" aria-labelledby="telegram-hero-title">
      <div className="telegram-hero__inner">
        <div className="telegram-hero__content">
          <div className="hero-heading">
            <h1 className="hero-heading__title" id="telegram-hero-title">
              <span className="hero-heading__line">Откройте новый канал</span>
              <span className="hero-heading__line">
                продаж в{' '}
                <span className="hero-heading__telegram">
                  Telegram
                   <img className="hero-heading__telegram-icon" src={telegramicon} alt="" />
                </span>
              </span>
              <span className="hero-heading__line">и увеличьте конверсию</span>
              <span className="hero-heading__line">
                до <span className="hero-heading__accent">+70%</span>
              </span>
            </h1>

            <p className="hero-heading__lead">
              <strong>Магазин в Telegram под ключ:</strong> больше продаж без сайта и дорогой разработки.
              <br />
              Монетизируйте аудиторию и принимайте заказы прямо внутри мессенджера.
            </p>
          </div>

          <ul className="hero-benefits" aria-label="Преимущества">
            {benefits.map((benefit) => (
              <li className="hero-benefits__item" key={benefit.highlighted}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.3333 7.05715V7.67048C14.3325 9.1081 13.867 10.5069 13.0062 11.6584C12.1454 12.8098 10.9355 13.6521 9.55691 14.0597C8.17829 14.4674 6.70484 14.4184 5.35631 13.9202C4.00779 13.422 2.85644 12.5012 2.07397 11.2952C1.29151 10.0892 0.919861 8.66253 1.01445 7.22803C1.10904 5.79353 1.6648 4.42803 2.59885 3.3352C3.5329 2.24236 4.79519 1.48074 6.19746 1.16391C7.59973 0.847089 9.06685 0.99204 10.38 1.57715M14.3333 2.33715L7.66667 9.01048L5.66667 7.01048" stroke="#00ADEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

                <span className="hero-benefits__text">
                  {benefit.before}
                  <strong>{benefit.highlighted}</strong>
                  {benefit.after}
                </span>
              </li>
            ))}
          </ul>

          <div className="hero-actions">
            <a className="hero-actions__button hero-actions__button--primary" href="#trial">
              <img className="hero-actions__icon" src={testButtonIcon} alt="" aria-hidden="true" />
              Протестировать
            </a>

            <a className="hero-actions__button hero-actions__button--secondary" href="#request">
              Оставить заявку
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <img className="hero-visual__image" src={mainImage} alt="" />
        </div>
      </div>
    </section>
  )
}
