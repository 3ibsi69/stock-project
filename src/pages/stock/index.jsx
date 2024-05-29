import axios from "axios";
import { useState, React, useEffect } from "react";
import Table from "../../components/table";
import ModalComp from "../../components/modalAddStock";

const Stock = () => {
  const [stockData, setStockData] = useState([]);
  const [responseData, setResponseData] = useState(null);

  const handleResponseData = (data) => {
    setResponseData(data);
  };
  const fetchStock = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_API_BASE_URL + "/stock/getAll"
      );
      setStockData(
        res.data.map((item) => ({
          name: item.name,
          Code: item.code,
          Designation: item.designation,
          Category: item.category,
          "Prix Achat HT": item.prixAchatHT,
          "Prix Vente HT": item.prixVenteHT,
          "Marge HT": item.MargeHT,
          Quantité: item.quantite,
        }))
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchStock();
  }, [responseData]);
  return (
    <div className="w-full h-full  p-4">
      <ModalComp onResponseData={handleResponseData} />

      <Table data={stockData} />
    </div>
  );
};

export default Stock;
