// React-Select styling object used across multiple files:

export const globalSelectStyle = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--page-background-color1)',
    color: 'black',
    borderColor: 'black',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--page-background-color1)',
    borderColor: 'black',
    borderWidth: '2px',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--page-background-color2)',
    fontsize: '16px',
    fontweight: 'bold',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--text-color2)',
  }),
  option: () => ({
    color: 'var(--text-color2)',
    ':hover': {
      backgroundColor: 'var(--page-background-color1)',
      color: 'var(--text-color2)',
    },
  }),
  singleValue: (provided, state) => {
    let color = 'var(--text-color2)';
    if (state.isDisabled) {
      color = 'var(--text-color2)';
    } else if (state.isSelected) {
      color = 'var(--text-color2)';
    }
    return { ...provided, color };
  },
};
