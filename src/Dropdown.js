import { useState, useEffect, useRef } from 'react';

const Dropdown = ({ onSelect }) => {
    const [dropdownToggled, setDropdownToggled] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handler(e) {
            if (dropdownRef.current) {
                if (!dropdownRef.current.contains(e.target)) {
                    setDropdownToggled(false);
                }
            }
        }

        document.addEventListener('click', handler);

        return () => {
            document.removeEventListener('click', handler);
        }
    })

    const dropdownOptions = [
        {
            id: 0,
            label: "Select driver",
            value: "",
        },
        {
            id: 1,
            label: "Max Verstappen",
            value: "verstappen",
        },
        {
            id: 2,
            label: "Lando Norris",
            value: "norris",
        },
        {
            id: 3,
            label: "Charles Leclerc",
            value: "leclerc",
        },
        {
            id: 4,
            label: "Carlos Sainz",
            value: "sainz",
        },
        {
            id: 5,
            label: "Oscar Piastri",
            value: "piastri",
        },
        {
            id: 6,
            label: "Sergio Perez",
            value: "perez",
        },
        {
            id: 7,
            label: "George Russell",
            value: "russell",
        },
        {
            id: 8,
            label: "Lewis Hamilton",
            value: "hamilton",
        },
        {
            id: 9,
            label: "Fernando Alonso",
            value: "alonso",
        },
        {
            id: 10,
            label: "Lance Stroll",
            value: "stroll",
        },
        {
            id: 11,
            label: "Nico Hulkenberg",
            value: "hulkenberg",
        },
        {
            id: 12,
            label: "Yuki Tsunoda",
            value: "tsunoda",
        },
        {
            id: 13,
            label: "Daniel Ricciardo",
            value: "ricciardo",
        },
        {
            id: 14,
            label: "Oliver Bearman",
            value: "bearman",
        },
        {
            id: 15,
            label: "Pierre Gasly",
            value: "gasly",
        },
        {
            id: 16,
            label: "Kevin Magnussen",
            value: "magnussen",
        },
        {
            id: 17,
            label: "Alexander Albon",
            value: "albon",
        },
        {
            id: 18,
            label: "Esteban Ocon",
            value: "ocon",
        },
        {
            id: 19,
            label: "Zhou Guanyu",
            value: "zhou",
        },
        {
            id: 20,
            label: "Logan Sargeant",
            value: "sargeant",
        },
        {
            id: 21,
            label: "Valtteri Bottas",
            value: "bottas",
        },
    ]

    return (
        <div className='dropdown' ref={dropdownRef}>
            <button className='toggleDropdown' onClick={() => {
                setDropdownToggled(!dropdownToggled);
            }}>
                <span>{selectedOption ? selectedOption.label : "Select Driver"}</span>
                <span>{dropdownToggled ? '∧' : '∨'}</span>
            </button>
            <div className={`optionsDropdown ${dropdownToggled ? 'visible' : ''}`}>
                {dropdownOptions.map((o, i) => {
                    return (
                        <button className={`${selectedOption.id === o.id ? 'selected' : ''}`} onClick={() => {
                            setSelectedOption(o);
                            onSelect(o.value);
                            setDropdownToggled(false);
                        }}>{o.label}</button>
                    )
                })}
            </div>
        </div>
    )
}

export default Dropdown;