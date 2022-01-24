import { Box, IconButton } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'

export function CartWithBadge({ count }: { count: number }) {
	return (
		<IconButton
			colorScheme="teal"
			css={css`
				position: relative !important;
			`}
			py="2"
			aria-label="Search database"
			size="lg"
			icon={
				<>
					<FiShoppingCart size={20} />
					<Box
						as="span"
						color="white"
						position="absolute"
						top="6px"
						right="4px"
						fontSize="0.8rem"
						bgColor="red"
						borderRadius="llg"
						zIndex={9999}
						p="1px"
					>
						{count}
					</Box>
				</>
			}
		/>
	)
}
