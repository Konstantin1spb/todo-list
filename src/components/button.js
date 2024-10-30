import styled from 'styled-components';

const ButtonContainer = ({ className, children, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	padding: ${({ padding }) => (padding ? padding : '10px')};
`;
