import React, { useMemo } from 'react';

const RE_DIGIT = new RegExp(/^\d+$/);

export default function OtpInput({ value, valueLength = 6, onChange }) {
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items = [];

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i];
            if (RE_DIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }

        return items;
    }, [value, valueLength]);

    const focusToNextInput = (target) => {
        const nextElementSibling = target.nextElementSibling;
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
    };

    const focusToPrevInput = (target) => {
        const previousElementSibling = target.previousElementSibling;
        if (previousElementSibling) {
            previousElementSibling.focus();
        }
    };

    const inputOnChange = (e, idx) => {
        const target = e.target;
        let targetValue = target.value.trim();
        const isTargetValueDigit = RE_DIGIT.test(targetValue);

        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const nextInputEl = target.nextElementSibling;

        if (!isTargetValueDigit && nextInputEl && nextInputEl.value !== '') {
            return;
        }

        const newValue = isTargetValueDigit ? value.substring(0, idx) + targetValue + value.substring(idx + 1) : value;

        onChange(newValue);

        if (isTargetValueDigit) {
            focusToNextInput(target);
        }
    };

    const inputOnKeyDown = (e) => {
        const { key } = e;
        const target = e.target;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }

        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        if (e.key === 'Backspace' && target.value === '') {
            focusToPrevInput(target);
        }
    };

    const inputOnFocus = (e) => {
        const { target } = e;
        const prevInputEl = target.previousElementSibling;

        if (prevInputEl && prevInputEl.value === '') {
            return prevInputEl.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };

    return (
        <div className="otp-form-group" style={{ display: 'flex', gap: '10px' }}>
            {valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    placeholder="-"
                    maxLength={1}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                    style={{
                        width: '50px',
                        height: '50px',
                        textAlign: 'center',
                        fontSize: '20px',
                        borderRadius: '8px',
                        border: '2px solid #FF8C00', // Use your brand's tertiary color
                        outline: 'none',
                        color: '#171717'
                    }}
                />
            ))}
        </div>
    );
}
