import { useState } from 'react'
import mainImage from '../../assets/leadmain.png'
import './LeadCapture.scss'

export default function LeadCapture() {
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [showThanks, setShowThanks] = useState(false)
  const isPhoneFilled = phone.trim().length > 0

  const formatPhoneFromDigits = (digits) => {
    const rest = digits.slice(1)

    let formatted = `+${digits[0]}`
    if (rest.length > 0) {
      formatted += ` (${rest.slice(0, 3)}`
    }
    if (rest.length >= 3) {
      formatted += ')'
    }
    if (rest.length > 3) {
      formatted += ` ${rest.slice(3, 6)}`
    }
    if (rest.length > 6) {
      formatted += `-${rest.slice(6, 8)}`
    }
    if (rest.length > 8) {
      formatted += `-${rest.slice(8, 10)}`
    }

    return formatted
  }

  const handlePhoneChange = (event) => {
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle')
    }
    const raw = event.target.value
    const digitsOnly = raw.replace(/\D/g, '')
    const isDeleting = raw.length < phone.length

    if (!digitsOnly) {
      setPhone('')
      return
    }

    if (isDeleting && digitsOnly.length <= 1) {
      setPhone('')
      return
    }

    let digits = digitsOnly
    if (digits[0] === '8') {
      digits = `7${digits.slice(1)}`
    } else if (digits[0] !== '7') {
      digits = `7${digits}`
    }

    digits = digits.slice(0, 11)
    setPhone(formatPhoneFromDigits(digits))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return

    const formData = new FormData(event.currentTarget)
    const telegram = String(formData.get('telegram') || '').trim()
    const phoneValue = phone.trim()

    const digits = phoneValue.replace(/\D/g, '')
    if (!phoneValue || digits.length < 10) {
      setSubmitStatus('invalid')
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('loading')

    try {
      const apiBase = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL || ''
      const sourceUrl = window.location.href
      const endpoint = apiBase ? `${apiBase}/api/leads/` : '/api/leads/'
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegram, phone: phoneValue, source_url: sourceUrl }),
      })

      if (!response.ok) {
        setSubmitStatus('error')
        return
      }

      setSubmitStatus('success')
      setShowThanks(true)
      setTimeout(() => setShowThanks(false), 2000)
      setPhone('')
      event.currentTarget.reset()
    } catch (error) {
      // Не показываем ошибку без подтвержденного ответа сервера
      setSubmitStatus('idle')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="lead-capture" id="request">
      <div className="lead-capture__inner">
        <div className="lead-capture__content">
          <h2 className="lead-capture__title">
            У 80% клиентов
            <br />
            магазин окупается в
            <br />
            <span>первый месяц</span>
          </h2>

          <p className="lead-capture__subtitle">
            Внедрим Telegram-магазин в вашей нише <strong>за 2-5 дней</strong>
          </p>

          <form className="lead-capture__form" onSubmit={handleSubmit}>
            <label className="lead-capture__label" htmlFor="telegram-nick">
              Ник в Telegram (необязательно)
            </label>
            <input
              className="lead-capture__input"
              id="telegram-nick"
              name="telegram"
              placeholder="@swift_manager"
              type="text"
              onChange={() => {
                if (submitStatus !== 'idle') {
                  setSubmitStatus('idle')
                }
              }}
            />

            <label className="lead-capture__label" htmlFor="phone">
              Номер телефона
            </label>
            <input
              className="lead-capture__input"
              id="phone"
              name="phone"
              placeholder="+7 (___) ___-__-__"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={handlePhoneChange}
            />

            <button className="lead-capture__submit" type="submit" disabled={!isPhoneFilled || isSubmitting}>
              {showThanks ? 'Спасибо' : isSubmitting ? 'Отправляем...' : 'Отправить заявку'}
            </button>
            {submitStatus === 'success' ? (
              <span className="lead-capture__status lead-capture__status--success">
                Заявка отправлена
              </span>
            ) : null}
            {submitStatus === 'error' ? (
              <span className="lead-capture__status lead-capture__status--error">
                Не удалось отправить. Попробуйте ещё раз.
              </span>
            ) : null}
            {submitStatus === 'invalid' ? (
              <span className="lead-capture__status lead-capture__status--error">
                Укажите номер телефона.
              </span>
            ) : null}
          </form>

          <div className="lead-capture__contacts">
            <span>Либо напишите нам в:</span>
            <div className="lead-capture__buttons">
              <a className="lead-capture__button" href="https://t.me/swift_manager">
                <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M0.499172 7.2935C0.542806 7.2713 0.586459 7.25021 0.629001 7.23023C1.36858 6.88169 2.11798 6.55536 2.86629 6.22902C2.90665 6.22902 2.97427 6.18129 3.01245 6.16575C3.07026 6.14022 3.12808 6.1158 3.1859 6.09027C3.29716 6.04143 3.40843 5.9937 3.5186 5.94486C3.74113 5.84829 3.96256 5.75171 4.18509 5.65514L5.51698 5.07462C6.40492 4.68834 7.29396 4.30095 8.1819 3.91467C9.06983 3.52839 9.95885 3.141 10.8468 2.75472C11.7347 2.36844 12.6237 1.98106 13.5117 1.59478C14.3996 1.2085 15.2886 0.821113 16.1766 0.434834C16.374 0.348254 16.5878 0.219492 16.7994 0.181752C16.9772 0.149562 17.1507 0.0874049 17.3296 0.052995C17.6688 -0.0124948 18.043 -0.0391323 18.368 0.104057C18.4804 0.154007 18.584 0.223936 18.6702 0.311626C19.0825 0.726765 19.0247 1.4083 18.9375 1.99216C18.3299 6.0614 17.7223 10.1318 17.1136 14.201C17.0307 14.7593 16.9172 15.3721 16.4842 15.725C16.1177 16.0236 15.5962 16.0569 15.1435 15.9304C14.6909 15.8027 14.2916 15.5352 13.9 15.2722C12.2758 14.1777 10.6504 13.0832 9.0262 11.9888C8.64005 11.729 8.21026 11.3894 8.21463 10.9176C8.21681 10.6335 8.38369 10.3804 8.55386 10.1551C9.96539 8.2814 12.002 6.9938 13.5171 5.20671C13.7309 4.95474 13.8989 4.49964 13.6055 4.35423C13.431 4.26765 13.2302 4.38531 13.071 4.49742C11.0682 5.91266 9.06656 7.32902 7.0638 8.74427C6.41039 9.20603 5.72535 9.68111 4.93777 9.79433C4.2331 9.89645 3.52406 9.69664 2.8423 9.4924C2.2707 9.32146 1.70018 9.14608 1.13186 8.96516C0.829699 8.8697 0.51772 8.76647 0.284282 8.55002C0.050845 8.33357 -0.0833088 7.96949 0.0574081 7.68089C0.145765 7.49996 0.317029 7.38563 0.497015 7.29239L0.499172 7.2935Z"
                    fill="#383838"
                  />
                </svg>
                Telegram
              </a>
              <a className="lead-capture__button" href="https://wa.me/+79517913332">
                <span className="lead-capture__wa" aria-hidden="true">
                  <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.2613 14.4577C9.25109 14.4577 5.98846 11.193 5.98737 7.18163C5.98846 6.16477 6.8162 5.33789 7.83056 5.33789C7.93485 5.33789 8.03803 5.34667 8.13683 5.36424C8.35419 5.40048 8.56059 5.47406 8.7505 5.58497C8.77795 5.60144 8.79661 5.6278 8.801 5.65854L9.22474 8.33025C9.23023 8.36099 9.22035 8.39284 9.1995 8.4159C8.96567 8.67506 8.66707 8.86173 8.33444 8.95507L8.17417 9.0001L8.23454 9.15493C8.78123 10.5473 9.8944 11.6597 11.2875 12.2088L11.4423 12.2703L11.4873 12.11C11.5806 11.7772 11.7672 11.4785 12.0263 11.2446C12.045 11.2271 12.0702 11.2183 12.0955 11.2183C12.101 11.2183 12.1064 11.2183 12.113 11.2194L14.7839 11.6433C14.8158 11.6487 14.8421 11.6663 14.8586 11.6938C14.9684 11.8837 15.0419 12.0913 15.0793 12.3087C15.0968 12.4053 15.1045 12.5075 15.1045 12.614C15.1045 13.6297 14.2779 14.4566 13.2613 14.4577Z"
                      fill="#383838"
                    />
                    <path
                      d="M20.3728 8.99354C20.1565 6.54914 19.0368 4.28154 17.2199 2.60912C15.3921 0.926808 13.0209 0 10.541 0C5.09813 0 0.669662 4.42978 0.669662 9.87422C0.669662 11.7015 1.17354 13.4815 2.12752 15.0321L0 19.743L6.81178 19.0171C7.9963 19.5025 9.24997 19.7484 10.5399 19.7484C10.8791 19.7484 11.2271 19.7309 11.5762 19.6946C11.8836 19.6617 12.1943 19.6134 12.4994 19.5519C17.0575 18.6306 20.3848 14.584 20.4112 9.92694V9.87422C20.4112 9.57773 20.398 9.28124 20.3717 8.99463L20.3728 8.99354ZM7.07416 16.9494L3.30545 17.3513L4.43069 14.8575L4.20564 14.5555C4.18917 14.5335 4.1727 14.5115 4.15404 14.4863C3.17701 13.1367 2.66104 11.5423 2.66104 9.87532C2.66104 5.52899 6.19592 1.99308 10.541 1.99308C14.6116 1.99308 18.0619 5.16991 18.3946 9.22524C18.4121 9.44267 18.422 9.66119 18.422 9.87642C18.422 9.93791 18.4209 9.99831 18.4198 10.0631C18.3364 13.6989 15.7972 16.7868 12.2447 17.5731C11.9736 17.6335 11.6958 17.6796 11.4192 17.7093C11.1316 17.7422 10.8363 17.7587 10.5432 17.7587C9.49917 17.7587 8.48482 17.5566 7.52645 17.1569C7.41996 17.1141 7.31566 17.068 7.21796 17.0207L7.07526 16.9516L7.07416 16.9494Z"
                      fill="#383838"
                    />
                  </svg>
                </span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="lead-capture__visual" aria-hidden="true">
          <img src={mainImage} alt="" />
        </div>
      </div>
    </section>
  )
}
