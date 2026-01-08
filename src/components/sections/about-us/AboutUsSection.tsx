export function AboutUsSection() {
  return (
    <section className="w-full py-16 flex flex-col space-y-24">
      
      {/* 1st section */}
      <section className="max-md:w-9/10 mx-auto flex flex-col md:flex-row justify-center items-center gap-10">
        <img
          src="/assets/images/about-us-img-0.jpg"
          alt="Coffeeino — о нас"
          className="w-full md:w-2/5 h-auto rounded-lg shadow-md"
        />

        <div className="w-full md:w-2/5 flex flex-col">
          <h2 className="text-4xl font-bold mb-6 max-md:text-center text-right">
            О Coffeeino
          </h2>

          <p className="text-lg text-gray-700 leading-7 flex flex-col min-md:space-y-12 space-y-8 min-md:text-justify">
            <span>
              Coffeeino — это не просто магазин кофе, а место, где начинается
              утро, рождаются идеи и формируются привычки. Мы создаём пространство
              для людей, которые ценят вкус, качество и атмосферу.
            </span>
            <span>
              Наша миссия — сделать качественный кофе доступным и понятным,
              независимо от того, только ли вы знакомитесь с кофейной культурой
              или уже давно разбираетесь в сортах, обжарке и методах заваривания.
            </span>
          </p>
        </div>
      </section>

      {/* 2nd section */}
      <section className="max-md:w-9/10 mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-10">
        <div className="w-full md:w-2/5">
          <h2 className="text-4xl font-bold mb-6 text-center min-md:text-left">
            Наш подход
          </h2>

          <p className="text-lg text-gray-700 leading-7 space-y-4 min-md:text-justify">
            <span>
              Мы тщательно подбираем продукты, работаем с проверенными поставщиками
              и уделяем внимание каждой детали — от выбора зерна до того, как
              оно попадает к вам в руки.
            </span>
            <br /><br />
            <span>
              Для нас важно не просто продать продукт, а помочь вам найти именно
              тот вкус, который станет частью вашего дня. Поэтому мы постоянно
              развиваемся, расширяем ассортимент и прислушиваемся к обратной связи
              наших клиентов.
            </span>
          </p>
        </div>

        <img
          src="/assets/images/about-us-img-1.jpg"
          alt="Подход Coffeeino"
          className="w-full md:w-2/5 h-auto rounded-lg shadow-md"
        />
      </section>

    </section>
  );
}
