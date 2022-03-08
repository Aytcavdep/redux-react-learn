import { Button } from "antd";
import "antd/dist/antd.css";
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { fetchCustomers } from "./asyncAction/customers";
import { addCashAction, getCashAction } from "./store/cashReducer";
import {
  addCustomerAction,
  removeCustomerAction,
} from "./store/customerReducer";

function App() {
  const dispatch = useDispatch();
  const cash = useSelector((state) => state.cash.cash);
  const customers = useSelector((state) => state.customers.customers);

  const addCash = (cash) => {
    dispatch(addCashAction(cash));
  };

  const getCash = (cash) => {
    dispatch(getCashAction(cash));
  };

  const addCustomer = (name) => {
    const customer = {
      name,
      id: Date.now(),
    };
    dispatch(addCustomerAction(customer));
  };

  const removeCustomer = (customer) => {
    dispatch(removeCustomerAction(customer.id));
  };

  return (
    <div className="app">
      <div className="head">Баланс: {cash}</div>
      <div>
        <Button
          icon={<PlusCircleOutlined />}
          type="primary"
          size={"small"}
          onClick={() => addCash(Number(prompt()))}
        >
          Пополнить счёт
        </Button>
        <Button
          icon={<MinusCircleOutlined />}
          type="primary"
          size={"small"}
          onClick={() => getCash(Number(prompt()))}
        >
          Снять со счета
        </Button>
        <Button
          icon={<UserAddOutlined />}
          type="primary"
          size={"small"}
          onClick={() => addCustomer(prompt())}
        >
          Добавить клиента
        </Button>
        <Button
          icon={<UsergroupAddOutlined />}
          type="primary"
          size={"small"}
          onClick={() => dispatch(fetchCustomers())}
        >
          Получить клиентов из базы
        </Button>
      </div>
      {customers.length > 0 ? (
        <div>
          {customers.map((customer) => (
            <div
              onClick={() => removeCustomer(customer)}
              key={customer.id}
              style={{
                fontSize: "2em",
                border: "1px solid black",
                padding: "10px",
                marginTop: 5,
              }}
            >
              {customer.name}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ fontSize: "3em" }}>Клиенты отсутствуют</div>
      )}
    </div>
  );
}

export default App;
