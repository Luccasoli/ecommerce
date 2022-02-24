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
			aria-label="cart"
			colorScheme="teal"
			css={css`
				position: relative !important;
			`}
			icon={
				<>
					<FiShoppingCart size={20} />
					{!!count && (
						<Box
							as="span"
							bgColor="red"
							borderRadius="llg"
							color="white"
							fontSize="0.8rem"
							p="1px"
							position="absolute"
							right="4px"
							top="6px"
							zIndex={9999}
						>
							{count}
						</Box>
					)}
				</>
			}
			py="2"
			size="lg"
			{...props}
		/>
	)
)
