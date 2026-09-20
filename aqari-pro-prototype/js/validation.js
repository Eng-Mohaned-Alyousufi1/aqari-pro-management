const Validation = {
  rules: {
    required(value) {
      if (value === null || value === undefined) return false;
      if (typeof value === 'string') return value.trim().length > 0;
      return true;
    },
    email(value) {
      if (!value) return true;
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    },
    phone(value) {
      if (!value) return true;
      return /^\+966[0-9]{9}$/.test(value.replace(/\s/g, ''));
    },
    password(value) {
      if (!value) return true;
      return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value);
    },
    minLength(value, min) {
      if (!value) return true;
      return value.length >= min;
    },
    maxLength(value, max) {
      if (!value) return true;
      return value.length <= max;
    },
    numeric(value) {
      if (!value) return true;
      return !isNaN(parseFloat(value)) && isFinite(value);
    },
    min(value, min) {
      if (!value) return true;
      return parseFloat(value) >= min;
    },
    max(value, max) {
      if (!value) return true;
      return parseFloat(value) <= max;
    },
    match(value, otherValue) {
      return value === otherValue;
    }
  },

  messages: {
    required: 'هذا الحقل مطلوب',
    email: 'البريد الإلكتروني غير صحيح',
    phone: 'رقم الجوال غير صحيح (يبدأ بـ +966)',
    password: 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل مع حرف كبير وصغير ورقم',
    minLength: 'يجب أن لا يقل عن {min} أحرف',
    maxLength: 'يجب أن لا يتجاوز {max} حرف',
    numeric: 'يجب أن يكون رقماً',
    min: 'يجب أن لا يقل عن {min}',
    max: 'يجب أن لا يتجاوز {max}',
    match: 'القيمتان غير متطابقتين'
  },

  validate(formData, rules) {
    const errors = {};

    for (const [field, fieldRules] of Object.entries(rules)) {
      const value = formData[field];

      for (const rule of fieldRules) {
        let ruleName, ruleParam;

        if (typeof rule === 'string') {
          ruleName = rule;
          ruleParam = null;
        } else if (Array.isArray(rule)) {
          ruleName = rule[0];
          ruleParam = rule[1];
        } else {
          continue;
        }

        if (ruleName === 'required' && !this.rules.required(value)) {
          errors[field] = this.messages.required;
          break;
        }

        if (value && this.rules[ruleName]) {
          const isValid = ruleParam !== null ? this.rules[ruleName](value, ruleParam) : this.rules[ruleName](value);
          if (!isValid) {
            let msg = this.messages[ruleName];
            if (ruleParam !== null) {
              msg = msg.replace('{min}', ruleParam).replace('{max}', ruleParam);
            }
            errors[field] = msg;
            break;
          }
        }
      }
    }

    return errors;
  },

  showErrors(form, errors) {
    this.clearErrors(form);

    for (const [field, message] of Object.entries(errors)) {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        input.classList.add('error');
        const errorEl = document.createElement('div');
        errorEl.className = 'form-error';
        errorEl.textContent = message;
        input.parentNode.appendChild(errorEl);
      }
    }
  },

  clearErrors(form) {
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
  },

  isFormValid(form) {
    return form.querySelectorAll('.form-error').length === 0;
  }
};
