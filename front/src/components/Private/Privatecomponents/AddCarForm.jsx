import * as React from 'react';
import { useSelector } from 'react-redux';
import { useAutocomplete } from '@mui/base/AutocompleteUnstyled';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';


const Label = styled('label')({
  display: 'block',
});

const Input = styled('input')(({ theme }) => ({
  width: 200,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.getContrastText(theme.palette.background.paper),
}));

const Listbox = styled('ul')(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: 'absolute',
  listStyle: 'none',
  backgroundColor: theme.palette.background.paper,
  overflow: 'auto',
  maxHeight: 200,
  border: '1px solid rgba(0,0,0,.25)',
  [`& li.${autocompleteClasses.focused}`]: {
    backgroundColor: '#4a8df6',
    color: 'white',
    cursor: 'pointer',
  },
  '& li:active': {
    backgroundColor: '#2977f5',
    color: 'white',
  },
}));

export default function AddCArForm() {

  const { cars } = useSelector((store) => store.cars)

  console.log('FROM AUTOCOMPLETE', cars)

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'use-autocomplete-demo',
    options: cars,
    getOptionLabel: (option) => option.brand,
  });

  return (
    <div className='addcar'>
      <h2 className="title addcar__title">Загрузить новое авто</h2>
      <div className='addcar__inner'>
        <div className='addcar__item'>
          <input className="addcar__item-input" type="text" placeholder='Марка' />
          <input className="addcar__item-input" type="text" placeholder='Модель' />
        </div>
        <div className='addcar__item'>
          <input className="addcar__item-input" type="text" placeholder='Тип кузов' />
          <input className="addcar__item-input" type="text" placeholder='Год выпуска' />
        </div>
        <div className='addcar__item'>
          <input className="addcar__item-input" type="text" placeholder='Объем двигателя' />
          <input className="addcar__item-input" type="text" placeholder='КПП' />
        </div>
        <div className='addcar__item'>
          <input className="addcar__item-input" type="text" placeholder='Мощность' />
          <input className="addcar__item-input" type="text" placeholder='Салон' />
        </div>
        <div className='addcar__item'>
          <input className="addcar__item-input" type="text" placeholder='Цена' />
          <input className="addcar__item-input" type="text" placeholder='Локация авто' />
        </div>
        <div className='addcar__item'>
          <input className="addcar__item-input" type="text" placeholder='Емкость' />
          <input className="addcar__item-input" type="text" placeholder='Загрузить фото' />
        </div>
        <button className="btn addcar__btn">Загрузить</button>

        {/* <div {...getRootProps()}>
          <Label {...getInputLabelProps()}>useAutocomplete</Label>
          <Input {...getInputProps()} />
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li {...getOptionProps({ option, index })}>{option.brand}</li>
            ))}
          </Listbox>
        ) : null} */}
      </div>

    </div>
  );
}

