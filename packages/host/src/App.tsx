import styled from 'styled-components'
// @ts-ignore
import { App as HomeApp } from 'home/Page'

const Main = styled.main`
	display: flex;
	flex-direction: column;
`

export const App = () => (
	<Main>
		<h1>Shell</h1>
		<HomeApp />
	</Main>
)
