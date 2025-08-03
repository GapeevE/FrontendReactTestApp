import { useState, useEffect, useMemo } from "react";
import { phonesData } from "../../data";

export default function Table({ rows }: { rows: number }) {
    const [selectedPhones, setSelectedPhones] = useState<typeof phonesData>([]);
    const [modalOpenIndex, setModalOpenIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [showDifferences, setShowDifferences] = useState(false);
    useEffect(() => {
        setSelectedPhones(prevPhones => {
            const maxPossibleRows = Math.min(rows, phonesData.length);
            if (prevPhones.length > maxPossibleRows) {
                return prevPhones.slice(0, maxPossibleRows);
            }
            if (maxPossibleRows > prevPhones.length) {
                const availablePhones = phonesData.filter(
                    phone => !prevPhones.some(p => p.name === phone.name)
                );
                const additionalPhones = availablePhones.slice(
                    0, 
                    maxPossibleRows - prevPhones.length
                );
                return [...prevPhones, ...additionalPhones];
            }
            if (prevPhones.length === 0 && maxPossibleRows > 0) {
                return phonesData.slice(0, maxPossibleRows);
            }
            return prevPhones;
        });
    }, [rows]);

    const handlePhoneChange = (phoneIndex: number, newPhone: typeof phonesData[0]) => {
        const updatedPhones = [...selectedPhones];
        updatedPhones[phoneIndex] = newPhone;
        setSelectedPhones(updatedPhones);
        setModalOpenIndex(null);
        setSearchTerm("");
    };

    const availablePhones = useMemo(() => {
        return phonesData.filter(phone => 
            !selectedPhones.some(selectedPhone => selectedPhone.name === phone.name)
        );
    }, [selectedPhones]);

    const filteredPhones = useMemo(() => {
        return searchTerm
            ? availablePhones.filter(phone =>
                phone.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            : availablePhones;
    }, [searchTerm, availablePhones]);

    const showChevronButton = (index: number) => {
        return availablePhones.length > 0;
    };

    const rowsWithDifferences = useMemo(() => {
        if (!showDifferences || selectedPhones.length <= 1) {
            return null; 
        }
        const differentRows = new Set<string>();
        const phoneProperties = [
            'producer', 'year', 'diagonal', 'country', 
            'memory', 'refresh', 'NFC', 'ESIM', 'wireless', 'price'
        ];
        phoneProperties.forEach(prop => {
            const firstValue = selectedPhones[0][prop as keyof typeof selectedPhones[0]];
            const hasDifference = selectedPhones.some(phone => 
                phone[prop as keyof typeof phone] !== firstValue
            );

            if (hasDifference) {
                differentRows.add(prop);
            }
        });
        return differentRows;
    }, [selectedPhones, showDifferences]);

    const shouldShowRow = (property: string) => {
        if (!showDifferences) return true;
        return rowsWithDifferences?.has(property) ?? false;
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <input 
                            type="checkbox" 
                            name="difference" 
                            id="difference" 
                            checked={showDifferences}
                            onChange={(e) => setShowDifferences(e.target.checked)}
                        />
                        <label htmlFor="difference">Показать различия</label>
                    </th>
                    {selectedPhones.map((phone, index) => (
                        <th key={index}>
                            <div className="card">
                                <div className="card_image">
                                    <img src={phone.image} alt={phone.name} />
                                    {showChevronButton(index) && (
                                        <button 
                                            className="btn__chevron" 
                                            onClick={() => setModalOpenIndex(index)}
                                        >
                                            <img src="chevron_small.svg" alt="chevron" />
                                        </button>
                                    )}
                                    {modalOpenIndex === index && <div className="background"
                                            onClick={() => {
                                                setModalOpenIndex(null);
                                                setSearchTerm("");
                                            }}
                                        ></div>}
                                    {modalOpenIndex === index && (
                                        <div className="card_modal">
                                            <input
                                                type="text"
                                                className="card_modal__search"
                                                placeholder="Поиск"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                            <div className="card_modal__phones">
                                                {filteredPhones.map((phoneItem, itemIndex) => (
                                                    <div 
                                                        key={itemIndex}
                                                        className="card_modal__item"
                                                    >
                                                        <button className="btn__arrows" onClick={() => handlePhoneChange(index, phoneItem)}>
                                                            <img src="arrows.svg" alt="" />
                                                        </button>
                                                        <img 
                                                            src={phoneItem.image} 
                                                            alt={phoneItem.name} 
                                                            width="24" 
                                                        />
                                                        <span>{phoneItem.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="card_footer">
                                    <p>{phone.name}</p>
                                </div>
                            </div>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {shouldShowRow('producer') && (
                    <tr>
                        <td className="td__header">
                            <p>Производитель</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.producer}</p>
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('year') && (
                    <tr>
                        <td className="td__header">
                            <p>Год релиза</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.year}</p>
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('diagonal') && (
                    <tr>
                        <td className="td__header">
                            <p>Диагональ экрана (дюйм)</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.diagonal}</p>
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('country') && (
                    <tr>
                        <td className="td__header">
                            <p>Страна-производитель</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.country}</p>
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('memory') && (
                    <tr>
                        <td className="td__header">
                            <p>Объем памяти</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.memory} Гб</p>
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('refresh') && (
                    <tr>
                        <td className="td__header">
                            <p>Частота обновления экрана</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.refresh} Гц</p>
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('NFC') && (
                    <tr>
                        <td className="td__header">
                            <p>NFC</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <img 
                                    src={phone.NFC ? "substract_green.svg" : "substract_red.svg"} 
                                    alt={phone.NFC ? "Есть NFC" : "Нет NFC"} 
                                />
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('ESIM') && (
                    <tr>
                        <td className="td__header">
                            <p>Поддержка eSIM</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <img 
                                    src={phone.ESIM ? "substract_green.svg" : "substract_red.svg"} 
                                    alt={phone.ESIM ? "Есть eSIM" : "Нет eSIM"} 
                                />
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('wireless') && (
                    <tr>
                        <td className="td__header">
                            <p>Поддержка беспроводной зарядки</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <img 
                                    src={phone.wireless ? "substract_green.svg" : "substract_red.svg"} 
                                    alt={phone.wireless ? "Есть беспроводная зарядка" : "Нет беспроводной зарядки"} 
                                />
                            </td>
                        ))}
                    </tr>
                )}
                {shouldShowRow('price') && (
                    <tr>
                        <td className="td__header">
                            <p>Стоимость</p>
                        </td>
                        {selectedPhones.map((phone, index) => (
                            <td key={index}>
                                <p>{phone.price.toLocaleString('ru-RU')} ₽</p>
                            </td>
                        ))}
                    </tr>
                )}
            </tbody>
        </table>
    );
}