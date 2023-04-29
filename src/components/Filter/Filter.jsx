import PropTypes from 'prop-types';
import { FilterBox } from './Filter.styled';

export function Filter({text, onChangeFilter}) {
    return (
        <FilterBox>
            Find contacts by name
            <input type="text" value={text} onChange={onChangeFilter} />
        </FilterBox>                
    );
}

Filter.propTypes = {
    text: PropTypes.string.isRequired,
    onChangeFilter: PropTypes.func.isRequired,    
};
