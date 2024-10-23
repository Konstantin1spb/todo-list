import styled from 'styled-components';

const H1Container = ({ className, children }) => {
	return <h1 className={className}>{children}</h1>;
};

export const H1 = styled(H1Container)`
	text-align: center;
`;
