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
            value: "VER",
        },
        {
            id: 2,
            label: "Lando Norris",
            value: "NOR",
        },
        {
            id: 3,
            label: "Charles Leclerc",
            value: "LEC",
        },
        {
            id: 4,
            label: "Carlos Sainz",
            value: "SAI",
        },
        {
            id: 5,
            label: "Oscar Piastri",
            value: "PIA",
        },
        {
            id: 6,
            label: "Sergio Perez",
            value: "PER",
        },
        {
            id: 7,
            label: "George Russell",
            value: "RUS",
        },
        {
            id: 8,
            label: "Lewis Hamilton",
            value: "HAM",
        },
        {
            id: 9,
            label: "Fernando Alonso",
            value: "ALO",
        },
        {
            id: 10,
            label: "Lance Stroll",
            value: "STR",
        },
        {
            id: 11,
            label: "Nico Hulkenberg",
            value: "HUL",
        },
        {
            id: 12,
            label: "Yuki Tsunoda",
            value: "TSU",
        },
        {
            id: 13,
            label: "Daniel Ricciardo",
            value: "RIC",
        },
        {
            id: 14,
            label: "Oliver Bearman",
            value: "BEA",
        },
        {
            id: 15,
            label: "Pierre Gasly",
            value: "GAS",
        },
        {
            id: 16,
            label: "Kevin Magnussen",
            value: "MAG",
        },
        {
            id: 17,
            label: "Alexander Albon",
            value: "ALB",
        },
        {
            id: 18,
            label: "Esteban Ocon",
            value: "OCO",
        },
        {
            id: 19,
            label: "Zhou Guanyu",
            value: "ZHO",
        },
        {
            id: 20,
            label: "Logan Sargeant",
            value: "SAR",
        },
        {
            id: 21,
            label: "Valtteri Bottas",
            value: "BOT",
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