import styled from 'styled-components';

const InputContainer = ({ className, ...props }) => {
	return <input className={className} {...props}></input>;
};

export const Input = styled(InputContainer)`
	padding: 10px;
	font-size: 14px;
`;
