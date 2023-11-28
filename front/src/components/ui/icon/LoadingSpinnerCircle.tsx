import TextCenterArea from '../TextCenterArea';

export default function LoadingSpinnerCircle() {
  return (
    <TextCenterArea>
      <span className='loading loading-spinner loading-lg text-warning'></span>
    </TextCenterArea>
  );
}
