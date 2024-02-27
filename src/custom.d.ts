declare module '*.svg' {
    import { SvgProps } from 'react-native-svg';
    //   const content: React.FC<SvgProps>;
    const content: React.FC<
        SvgProps & {
            fillSecondary?: string;
        }
    >;
    //   const content: any;
    export default content;
}
