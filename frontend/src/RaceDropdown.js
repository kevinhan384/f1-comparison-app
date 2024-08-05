import { useState, useEffect, useRef } from 'react';

const RaceDropdown = ({ onSelect }) => {
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
            label: "Select Race",
            value: "",
        },
        {
            id: 1,
            label: "Bahrain Grand Prix",
            value: "Bahrain Grand Prix",
        },
        {
            id: 2,
            label: "Saudi Arabian Grand Prix",
            value: "Saudi Arabian Grand Prix",
        },
        {
            id: 3,
            label: "Australian Grand Prix",
            value: "Australian Grand Prix",
        },
        {
            id: 4,
            label: "Emilia Romagna Grand Prix",
            value: "Emilia Romagna Grand Prix",
        },
        {
            id: 5,
            label: "Miami Grand Prix",
            value: "Miami Grand Prix",
        },
        {
            id: 6,
            label: "Spanish Grand Prix",
            value: "Spanish Grand Prix",
        },
        {
            id: 7,
            label: "Monaco Grand Prix",
            value: "Monaco Grand Prix",
        },
        {
            id: 8,
            label: "Azerbaijan Grand Prix",
            value: "Azerbaijan Grand Prix",
        },
        {
            id: 9,
            label: "Canadian Grand Prix",
            value: "Canadian Grand Prix",
        },
        {
            id: 10,
            label: "British Grand Prix",
            value: "British Grand Prix",
        },
        {
            id: 11,
            label: "Austrian Grand Prix",
            value: "Austrian Grand Prix",
        },
        {
            id: 12,
            label: "French Grand Prix",
            value: "French Grand Prix",
        },
        {
            id: 13,
            label: "Hungarian Grand Prix",
            value: "Hungarian Grand Prix",
        },
        {
            id: 14,
            label: "Belgian Grand Prix",
            value: "Belgian Grand Prix",
        },
        {
            id: 15,
            label: "Dutch Grand Prix",
            value: "Dutch Grand Prix",
        },
        {
            id: 16,
            label: "Italian Grand Prix",
            value: "Italian Grand Prix",
        },
        {
            id: 17,
            label: "Singapore Grand Prix",
            value: "Singapore Grand Prix",
        },
        {
            id: 18,
            label: "Japanese Grand Prix",
            value: "Japanese Grand Prix",
        },
        {
            id: 19,
            label: "United States Grand Prix",
            value: "United States Grand Prix",
        },
        {
            id: 20,
            label: "Mexico City Grand Prix",
            value: "Mexico City Grand Prix",
        },
        {
            id: 21,
            label: "Sao Paulo Grand Prix",
            value: "Sao Paulo Grand Prix",
        },
        {
            id: 22,
            label: "Abu Dhabi Grand Prix",
            value: "Abu Dhabi Grand Prix",
        }
    ]

    return (
        <div className='dropdown' ref={dropdownRef}>
            <button className='toggleDropdown' onClick={() => {
                setDropdownToggled(!dropdownToggled);
            }}>
                <span>{selectedOption ? selectedOption.label : "Select Race"}</span>
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

export default RaceDropdown;