document.addEventListener('DOMContentLoaded', function() {
    const dayInput = document.querySelector('input[placeholder="DD"]');
    const monthInput = document.querySelector('input[placeholder="MM"]');
    const yearInput = document.querySelector('input[placeholder="YYYY"]');
    const arrowBtn = document.getElementById('arrow-btn');

    function isLeapYear(year) {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    }

    function validateDate() {
        let isValid = true;
        const day = parseInt(dayInput.value);
        const month = parseInt(monthInput.value);
        const year = parseInt(yearInput.value);
        const currentYear = new Date().getFullYear();

        if (!day) {
            document.getElementById('day-empty-error').style.display = 'block';
            document.getElementById('day').style.color = 'var(--error-clr)';
            document.getElementById('day-input').style.borderColor = 'var(--error-clr)';
            isValid = false;
        } else if (day < 1 || day > 31) {
            document.getElementById('day-error').style.display = 'block';
            isValid = false;
        }

        if (!month) {
            document.getElementById('month-empty-error').style.display = 'block';
            document.getElementById('month').style.color = 'var(--error-clr)';
            document.getElementById('month-input').style.borderColor = 'var(--error-clr)';
            isValid = false;
        } else if (month < 1 || month > 12) {
            document.getElementById('month-error').style.display = 'block';
            isValid = false;
        }

        if (!year) {
            document.getElementById('year-empty-error').style.display = 'block';
            document.getElementById('year').style.color = 'var(--error-clr)';
            document.getElementById('year-input').style.borderColor = 'var(--error-clr)';
            isValid = false;
        } else if (year < 1 || year > currentYear) {
            document.getElementById('year-error').style.display = 'block';
            isValid = false;
        }

        if (month === 2) {
            const maxDay = isLeapYear(year) ? 29 : 28;
            if (day > maxDay) {
                document.getElementById('day-error').style.display = 'block';
                isValid = false;
            }
        }

        return isValid;
    }

    function calculateAge(day, month, year) {
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let ageYear = today.getFullYear() - birthDate.getFullYear();
        let ageMonth = today.getMonth() - birthDate.getMonth();
        let ageDay = today.getDate() - birthDate.getDate();

        if (ageDay < 0) {
            ageMonth--;
            ageDay += new Date(year, month, 0).getDate();
        }
        if (ageMonth < 0) {
            ageYear--;
            ageMonth += 12;
        }

        return { years: ageYear, months: ageMonth, days: ageDay };
    }

    arrowBtn.addEventListener('click', function() {
        // Clear previous errors
        document.querySelectorAll('#input-field-container p').forEach(p => p.style.display = 'none');

        if (validateDate()) {
            const day = parseInt(dayInput.value);
            const month = parseInt(monthInput.value);
            const year = parseInt(yearInput.value);
            const age = calculateAge(day, month, year);

            document.getElementById('years-result').textContent = age.years;
            document.getElementById('months-result').textContent = age.months;
            document.getElementById('days-result').textContent = age.days;
        }
    });
});
