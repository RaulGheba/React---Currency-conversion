import { useEffect, useState } from "react";

export default function App() {
  const [currencyToConvert, setCurrencyToConvert] = useState("EUR");
  const [currencyToConvertTo, setCurrencyToConvertTo] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState(null);
  // const call = `https://api.frankfurter.app/latest?amount=100&from=${currencyToConvert}&to=${currencyToConvertTo}`;

  useEffect(() => {
    async function convert() {
      var call = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyToConvert}&to=${currencyToConvertTo}`
      );
      const resp = await call.json();
      const { rates } = resp;
      const result = Object.values(rates);
      const [convertedSum] = [...result];
      console.log(
        `Output of converting ${currencyToConvert}${amount} to ${currencyToConvertTo}: ${convertedSum}`
      );
      setOutput(convertedSum);
    }

    convert();
  }, [currencyToConvert, currencyToConvertTo, amount]);

  return (
    <Box>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select onChange={(e) => setCurrencyToConvert(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setCurrencyToConvertTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {currencyToConvert === currencyToConvertTo
          ? "same currency"
          : `Converted
        sum: ${output} ${currencyToConvertTo}`}
      </p>
    </Box>
  );
}

function Box({ children }) {
  return <div>{children}</div>;
}
