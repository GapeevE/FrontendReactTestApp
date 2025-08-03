import { useState } from "react"
import Table from "../table/Table";

export default function Main() {
    const [select, setSelect] = useState(3);
    const values = [2, 3, 4, 5, 6];
    const btns = values.map(num => {
        return <button 
                className={`btn__products_selector ${select === num && 'btn__products_selector__active'}`} 
                value={num}
                key={num}
                onClick={() => setSelect(num)}>
                    {num}
            </button>
    });
    return <main>
            <div className="main_header">
                <h1>Смартфоны</h1>
                <div className="products_selector">
                    <p className="p__products_selector">Отобразить товары:</p>
                    { btns }
                </div>
            </div>
            <Table rows={select} />
        </main>
}