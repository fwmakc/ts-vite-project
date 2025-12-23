import { APP } from '../../libs/app-info';

export default function (): void {
  document.querySelector<HTMLDivElement>(
    '#app #app-info-component',
  )!.innerHTML = JSON.stringify(APP, null, ' ');
}
