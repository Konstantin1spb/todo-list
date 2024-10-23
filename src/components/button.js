import styled from 'styled-components';

const ButtonContainer = ({ className, children }) => {
	return <button className={className}>{children}</button>;
};

export const Button = styled(ButtonContainer)`
	padding: 10px;
`;
