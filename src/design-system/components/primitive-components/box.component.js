import styled from 'styled-components';
import {
	compose,
	space,
	color,
	layout,
	flexbox,
	border,
	typography
} from 'styled-system';
import propTypes from '@styled-system/prop-types';

const css = props => props.css;

export const Box = styled('div')(
	{
		boxSizing: 'border-box',
		margin: 0
	},
	compose(
		space,
		layout,
		typography,
		border,
		color,
		flexbox
	),
	css
);

Box.propTypes = {
	...propTypes.typography,
	...propTypes.layout,
	...propTypes.color,
	...propTypes.space,
	...propTypes.flexbox,
	...propTypes.position
};