interface Props {
  percentage: number;
}

export const ProgressBar = (props: Props) => {
  const { percentage } = props;

  return (
    <div className='flex-1'>
      <span className='font-semibold'>{Math.floor(percentage)}%</span>
      <div className='border border-green-500 h-2.5 rounded-full'>
        <div
          style={{ width: `${String(percentage)}%` }}
          className={`bg-green-500 h-full rounded-full`}
        />
      </div>
    </div>
  );
};
