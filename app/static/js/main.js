/**
 * CyberGuard – Interactive JavaScript Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    // Auto-set progress bar widths from data-width attribute to avoid CSS validation errors in editor templates
    document.querySelectorAll('.progress-bar[data-width]').forEach(bar => {
        bar.style.width = bar.getAttribute('data-width');
    });

    // 1. Password Strength Checker (Live UI updates)
    const livePassInput = document.getElementById('live-password-input');
    if (livePassInput) {
        livePassInput.addEventListener('input', () => {
            const password = livePassInput.value;
            const analysis = evaluateStrengthClient(password);
            updateStrengthUI(analysis);
        });
    }

    // 2. Password Generator length slider
    const genLengthSlider = document.getElementById('gen-length-slider');
    const genLengthLabel = document.getElementById('gen-length-label');
    if (genLengthSlider && genLengthLabel) {
        genLengthSlider.addEventListener('input', () => {
            genLengthLabel.textContent = genLengthSlider.value;
        });
    }

    // 3. Copy button handlers
    const copyButtons = document.querySelectorAll('.btn-copy-pass');
    copyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = btn.getAttribute('data-target');
            let textToCopy = '';
            
            if (targetId) {
                const targetElem = document.getElementById(targetId);
                if (targetElem) {
                    textToCopy = targetElem.value || targetElem.textContent;
                }
            } else {
                textToCopy = btn.getAttribute('data-clipboard-text');
            }

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    const originalHTML = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check text-success"></i> Copied!';
                    btn.classList.add('btn-outline-success');
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('btn-outline-success');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

    // 4. Toggle Vault Passwords Visibility
    const togglePassVisibilityButtons = document.querySelectorAll('.btn-toggle-visibility');
    togglePassVisibilityButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = btn.querySelector('i');
            
            if (targetInput) {
                if (targetInput.type === 'password') {
                    targetInput.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    targetInput.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
            }
        });
    });

    // 5. Interactive Habits Score Calculator on Tips page
    const habitChecks = document.querySelectorAll('.habit-check');
    if (habitChecks.length > 0) {
        habitChecks.forEach(chk => {
            chk.addEventListener('change', calculateHabitScore);
        });
        calculateHabitScore(); // initial call
    }
});

/**
 * Perform a fast client-side password assessment
 */
function evaluateStrengthClient(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lengthGood: password.length >= 12,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        digit: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9]/.test(password)
    };

    if (password.length > 0) {
        if (checks.lengthGood) score += 2;
        else if (checks.length) score += 1;
        
        if (checks.upper && checks.lower) score += 1;
        if (checks.digit) score += 1;
        if (checks.symbol) score += 1;
    }

    return {
        score: score,
        checks: checks
    };
}

/**
 * Redraw Strength Bar and Checklist status
 */
function updateStrengthUI(analysis) {
    const bar = document.getElementById('live-strength-bar');
    const label = document.getElementById('live-strength-label');
    if (!bar || !label) return;

    const score = analysis.score;
    let width = (score / 5) * 100;
    let colorClass = 'bg-danger';
    let text = 'Very Weak';

    if (score === 0) {
        width = 5;
        text = 'Empty/Very Weak';
    } else if (score === 1) {
        colorClass = 'bg-danger';
        text = 'Very Weak';
    } else if (score === 2) {
        colorClass = 'bg-warning';
        text = 'Weak';
    } else if (score === 3) {
        colorClass = 'bg-info';
        text = 'Medium';
    } else if (score === 4) {
        colorClass = 'bg-primary';
        text = 'Strong';
    } else if (score === 5) {
        colorClass = 'bg-success';
        text = 'Very Strong';
    }

    bar.style.width = `${width}%`;
    bar.className = `strength-bar ${colorClass}`;
    label.textContent = text;
    label.className = `badge badge-rating badge-${text.toLowerCase().replace(' ', '-')}`;

    // Update Criteria checklists
    updateChecklistElement('crit-len', analysis.checks.length);
    updateChecklistElement('crit-case', analysis.checks.upper && analysis.checks.lower);
    updateChecklistElement('crit-num', analysis.checks.digit);
    updateChecklistElement('crit-sym', analysis.checks.symbol);
}

function updateChecklistElement(id, passed) {
    const el = document.getElementById(id);
    if (!el) return;
    const icon = el.querySelector('i');
    
    if (passed) {
        el.className = 'check-item passed';
        icon.className = 'fas fa-check-circle me-2';
    } else {
        el.className = 'check-item failed';
        icon.className = 'fas fa-times-circle me-2';
    }
}

/**
 * Dynamic calculation of the Security Hygiene Score on Tips Page
 */
function calculateHabitScore() {
    const checks = document.querySelectorAll('.habit-check');
    const scoreVal = document.getElementById('habit-score-value');
    const ratingText = document.getElementById('habit-rating-text');
    const bar = document.getElementById('habit-progress-bar');
    if (!scoreVal || !ratingText || !bar) return;

    let checkedCount = 0;
    checks.forEach(chk => {
        if (chk.checked) checkedCount++;
    });

    const percent = Math.round((checkedCount / checks.length) * 100);
    scoreVal.textContent = `${percent}%`;
    bar.style.width = `${percent}%`;

    let rating = "Critical Action Required";
    let colorClass = "bg-danger";
    
    if (percent === 100) {
        rating = "CyberGuard Elite (Highly Secure)";
        colorClass = "bg-success";
    } else if (percent >= 80) {
        rating = "Secure (Good security posture)";
        colorClass = "bg-success";
    } else if (percent >= 60) {
        rating = "Moderate (Needs minor improvements)";
        colorClass = "bg-info";
    } else if (percent >= 40) {
        rating = "Vulnerable (Warning: Add protections)";
        colorClass = "bg-warning";
    }

    ratingText.textContent = rating;
    bar.className = `progress-bar ${colorClass}`;
}
