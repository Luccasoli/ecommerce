/* eslint-disable react/jsx-props-no-spreading */
import { Box, forwardRef, IconButton, IconButtonProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { FiShoppingCart } from 'react-icons/fi'

type CartWithBadgeProps = {
	count: number
} & Omit<IconButtonProps, 'aria-label'>

export const CartWithBadge = forwardRef(
	({ count, ...props }: CartWithBadgeProps, ref) => (
		<IconButton
			ref={ref}
			colorScheme="teal"
			css={css`
				position: relative !important;
			`}
			py="2"
			aria-label="cart"
			size="lg"
			icon={
				<>
					<FiShoppingCart size={20} />
					{!!count && (
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
					)}
				</>
			}
			{...props}
		/>
	)
)
