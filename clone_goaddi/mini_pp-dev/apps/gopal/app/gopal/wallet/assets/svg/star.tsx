export const Star = ({color}: {color: string}) => {
    return (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill={color}
        color={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27.9218 6.76233C27.8223 6.45205 27.633 6.1783 27.3777 5.97579C27.1225 5.77327 26.8128 5.65112 26.4881 5.62483L21.8356 5.23108L20.0206 0.999833C19.8925 0.7032 19.6803 0.450552 19.4103 0.273055C19.1403 0.0955585 18.8243 0.000976562 18.5012 0.000976562C18.1781 0.000976562 17.862 0.0955585 17.592 0.273055C17.322 0.450552 17.1099 0.7032 16.9818 0.999833L15.1668 5.23233L10.5131 5.62483C10.1899 5.65079 9.88169 5.77186 9.62727 5.97278C9.37285 6.1737 9.18364 6.44547 9.08349 6.7538C8.98334 7.06213 8.97675 7.39322 9.06454 7.70529C9.15234 8.01736 9.33059 8.29644 9.57681 8.50733L13.0968 11.5073L12.0431 15.9736C11.969 16.2866 11.9887 16.6146 12.0999 16.9165C12.211 17.2184 12.4087 17.4808 12.6681 17.6711C12.9305 17.8638 13.244 17.9749 13.5692 17.9905C13.8945 18.0061 14.2171 17.9254 14.4968 17.7586L18.4968 15.3836L22.4968 17.7586C22.7765 17.9254 23.0991 18.0061 23.4244 17.9905C23.7496 17.9749 24.0631 17.8638 24.3256 17.6711C24.5851 17.4809 24.7828 17.2185 24.894 16.9166C25.0051 16.6146 25.0248 16.2866 24.9506 15.9736L23.8968 11.5073L27.4156 8.50733C27.6632 8.29926 27.8435 8.02235 27.9336 7.7117C28.0238 7.40105 28.0196 7.07064 27.9218 6.76233ZM22.4393 10.1373C22.209 10.3325 22.0373 10.5877 21.9433 10.8745C21.8493 11.1614 21.8366 11.4687 21.9068 11.7623L22.8206 15.6373L19.3481 13.5736C19.0918 13.4208 18.7989 13.3401 18.5006 13.3401C18.2022 13.3401 17.9093 13.4208 17.6531 13.5736L14.1806 15.6248L15.0943 11.7498C15.1655 11.4564 15.1535 11.1489 15.0597 10.8618C14.9658 10.5748 14.7939 10.3196 14.5631 10.1248L11.5306 7.54733L15.5418 7.20733C15.8395 7.18236 16.1248 7.07677 16.3671 6.90192C16.6093 6.72706 16.7993 6.48953 16.9168 6.21483L18.5006 2.52983L20.0806 6.21483C20.1982 6.48937 20.3884 6.72675 20.6306 6.90158C20.8728 7.0764 21.1579 7.18209 21.4556 7.20733L25.4668 7.54733L22.4393 10.1373ZM8.70806 13.7073L1.70806 20.7073C1.52042 20.895 1.26592 21.0004 1.00056 21.0004C0.735192 21.0004 0.480697 20.895 0.293056 20.7073C0.105415 20.5197 0 20.2652 0 19.9998C0 19.7345 0.105415 19.48 0.293056 19.2923L7.29306 12.2923C7.4807 12.1047 7.73519 11.9993 8.00056 11.9993C8.26592 11.9993 8.52042 12.1047 8.70806 12.2923C8.8957 12.48 9.00111 12.7345 9.00111 12.9998C9.00111 13.2652 8.8957 13.5197 8.70806 13.7073ZM10.7081 20.7073L3.70806 27.7073C3.61515 27.8002 3.50485 27.8739 3.38345 27.9242C3.26206 27.9745 3.13195 28.0004 3.00056 28.0004C2.86916 28.0004 2.73905 27.9745 2.61766 27.9242C2.49627 27.8739 2.38597 27.8002 2.29306 27.7073C2.20015 27.6144 2.12645 27.5041 2.07616 27.3827C2.02588 27.2613 2 27.1312 2 26.9998C2 26.8684 2.02588 26.7383 2.07616 26.6169C2.12645 26.4955 2.20015 26.3852 2.29306 26.2923L9.29306 19.2923C9.4807 19.1047 9.73519 18.9993 10.0006 18.9993C10.2659 18.9993 10.5204 19.1047 10.7081 19.2923C10.8957 19.48 11.0011 19.7345 11.0011 19.9998C11.0011 20.2652 10.8957 20.5197 10.7081 20.7073ZM19.7081 19.2923C19.801 19.3852 19.8748 19.4955 19.9251 19.6169C19.9754 19.7383 20.0013 19.8684 20.0013 19.9998C20.0013 20.1312 19.9754 20.2614 19.9251 20.3828C19.8748 20.5042 19.801 20.6145 19.7081 20.7073L12.7081 27.7073C12.6151 27.8002 12.5048 27.8739 12.3835 27.9242C12.2621 27.9745 12.132 28.0004 12.0006 28.0004C11.8692 28.0004 11.7391 27.9745 11.6177 27.9242C11.4963 27.8739 11.386 27.8002 11.2931 27.7073C11.2001 27.6144 11.1264 27.5041 11.0762 27.3827C11.0259 27.2613 11 27.1312 11 26.9998C11 26.8684 11.0259 26.7383 11.0762 26.6169C11.1264 26.4955 11.2001 26.3852 11.2931 26.2923L18.2931 19.2923C18.3859 19.1994 18.4962 19.1256 18.6176 19.0753C18.739 19.0249 18.8691 18.999 19.0006 18.999C19.132 18.999 19.2621 19.0249 19.3835 19.0753C19.5049 19.1256 19.6152 19.1994 19.7081 19.2923Z"
          fill={color}
        />
      </svg>
    );
}