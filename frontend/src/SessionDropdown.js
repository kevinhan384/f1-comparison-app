import { useState, useEffect, useRef } from 'react';

const SessionDropdown = ({ onSelect }) => {
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
            label: "Select Session",
            value: "",
        },
        {
            id: 1,
            label: "FP1",
            value: "FP1",
        },
        {
            id: 2,
            label: "FP2",
            value: "FP3",
        },
        {
            id: 3,
            label: "Qualifying",
            value: "Q",
        },
        {
            id: 4,
            label: "Sprint",
            value: "S",
        },
        {
            id: 5,
            label: "Sprint Shootout",
            value: "SS",
        },
        {
            id: 6,
            label: "Sprint Qualifying",
            value: "SQ"
        },
        {
            id: 7,
            label: "Race",
            value: 'R'
        }
    ]

    return (
        <div className='dropdown' ref={dropdownRef}>
            <button className='toggleDropdown' onClick={() => {
                setDropdownToggled(!dropdownToggled);
            }}>
                <span>{selectedOption ? selectedOption.label : "Select Session"}</span>
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

export default SessionDropdown;