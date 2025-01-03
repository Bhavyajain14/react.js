import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const style = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const Pizzas = pizzaData;
  // const Pizzas = [];

  const pizzaNum = Pizzas.length;
  return (
    <main className="menu">
      <h2>Our menu</h2>

      {pizzaNum > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from oue stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {Pizzas.map((pizza) => (
              <Pizza pizzaObj={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>We're currently working on our menu. Please come back later :)</p>
      )}

      {/*<Pizza
        name="Pizza Spinaci"
        ingredients="Tomato, mozarella, spinaci, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10} // Number
        // price= "10"  string
      />*/}
    </main>
  );
}

function Pizza(props) {
  // if (props.pizzaObj.soldOut) return null;

  return (
    <li className={`pizza ${props.pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={props.pizzaObj.photoName} alt={props.pizzaObj.name} />
      <div>
        <h3>{props.pizzaObj.name}</h3>
        <p>{props.pizzaObj.ingredients}</p>
        <span>
          {props.pizzaObj.soldOut ? "SOLD OUT" : props.pizzaObj.price}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openingHour = 14;
  const closingHour = 22;

  const isOpen = hour >= openingHour && hour <= closingHour;
  console.log(isOpen);

  // if (hour >= openingHour && hour <= closingHour)
  //   alert("We're currently open!");
  // else alert("Sorry We're Closed");
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closingHour={closingHour} />
      ) : (
        <p>
          We're happy to welcome you between {openingHour} and {closingHour}{" "}
        </p>
      )}

      {/* {new Date().toLocaleTimeString()}. We're currently open!{" "} */}
    </footer>
  );
  // return React.createElement("footer", null, "We are currently open!");
}

function Order({ closingHour }) {
  return (
    <div className="order">
      <p>We're open until {closingHour}:00. Come visit us or order online.</p>
      <button className="btn">Order</button>
    </div>
  );
}

// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
