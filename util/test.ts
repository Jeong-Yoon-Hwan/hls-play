const { spawn } = require("child_process")

const rtspUrl = [
  'rtsp://210.99.70.120:1935/live/cctv002.stream',
  'rtsp://210.99.70.120:1935/live/cctv003.stream',
  'rtsp://210.99.70.120:1935/live/cctv004.stream',
  'rtsp://210.99.70.120:1935/live/cctv005.stream',
  // 'rtsp://210.99.70.120:1935/live/cctv006.stream',
  // 'rtsp://210.99.70.120:1935/live/cctv007.stream',
  // 'rtsp://210.99.70.120:1935/live/cctv008.stream',
  // 'rtsp://210.99.70.120:1935/live/cctv009.stream',
  // 'rtsp://210.99.70.120:1935/live/cctv010.stream',
]

const testUrl = "rtsp://210.99.70.120:1935/live/cctv001.stream"

 for(let i=0;i<rtspUrl.length;i++){

   const hlsOutputUrl = `CH0${i+1}/output.m3u8`;
  //const hlsOutputUrl = `CH01/output.m3u8`
  const ffmpegProcess = spawn('ffmpeg',[
    '-rtsp_transport','tcp',
    '-stream_loop','-1',
    '-i',rtspUrl[i],
    '-c:v','libx264',
    '-preset','veryfast',
    '-tune','zerolatency',
    '-filter:v','scale=640x480', //해상도
    '-b:v','3000k', //비트레이트
    '-minrate','3000k',
    '-maxrate','3000k',
    '-bufsize','10000k', //버퍼사이즈
    '-hls_init_time','3', //hls_time 초기화
    '-hls_flags','delete_segments', //개수 초과 파일 삭제
    '-hls_list_size','5',  //재생목록 최대 개수 지정
    '-flags','+cgop',
    '-crf', '30',
    '-r','30',
    '-g','30',  //GOP
    '-hls_time','2',  //청크파일 길이
    '-f','hls',
    
    hlsOutputUrl,
  ]);

  ffmpegProcess.stdout.on('data',(data: any)=>{
    console.log(`stdout: ${data}`)
  });
  ffmpegProcess.stderr.on('data',(data: any)=>{
    console.error(`stderr: ${data}`)
  });
  ffmpegProcess.on('close',(code: any)=>{
    console.log(`child Process exited with code ${code}`)
  })
 }

