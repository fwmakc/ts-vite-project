import { readFileByBrowser } from './helpers/read_file_by_browser.helper';
import { readFileByBrowserApi } from './helpers/read_file_by_browser_api.helper';
import { readFileByFetchInProject } from './helpers/read_file_by_fetch_in_project.helper';
import { readFileByFetchTarget } from './helpers/read_file_by_fetch_target.helper';
import { readFileByImport } from './helpers/read_file_by_import.helper';
import { writeFileByBrowser } from './helpers/write_file_by_browser.helper';
import { writeFileByBrowserApi } from './helpers/write_file_by_browser_api.helper';

export default function (): void {
  document.querySelector<HTMLDivElement>('#app #file-component')!.innerHTML = `
  <div class="row">
    <div class="col">
      <div id="ReadFileByBrowserApi">
        <h3>ReadFileByBrowserApi</h3>
        <div class="file_content">здесь будет содержимое файла</div>
        <input type="button" class="button" value="Открыть">
        <div class="status"></div>
      </div>
    </div>

    <div class="col">
      <div id="WriteFileByBrowserApi">
        <h3>WriteFileByBrowserApi</h3>
        <textarea class="file_content">ваше содержимое файла</textarea>
        <input type="button" class="button" value="Сохранить">
        <div class="status"></div>
      </div>
    </div>
  </div>


  <div class="row">
    <div class="col">
      <div id="ReadFileByBrowser">
        <h3>ReadFileByBrowser</h3>
        <div class="file_content">здесь будет содержимое файла</div>
        <input type="file" class="button">
      </div>
    </div>

    <div class="col">
      <div id="WriteFileByBrowser">
        <h3>WriteFileByBrowser</h3>
        <textarea class="file_content">ваше содержимое файла</textarea>
        <input type="button" class="button" value="Сохранить">
        <div class="status"></div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div id="ReadFileByImport">
        <h3>ReadFileByImport</h3>
        <div class="file_content">здесь будет содержимое файла</div>
      </div>
    </div>

    <div class="col">
      <div id="ReadFileByFetchInProject">
        <h3>ReadFileByFetchInProject</h3>
        <div class="file_content">здесь будет содержимое файла</div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col">
      <div id="ReadFileByFetchTarget">
        <h3>ReadFileByFetchTarget</h3>
        <div class="file_content">здесь будет содержимое файла</div>
        <input type="text" class="input" value="/files/example.txt">
        <input type="button" class="button" value="Открыть">
      </div>
    </div>
  </div>
`;

  readFileByBrowser(
    document.querySelector<HTMLDivElement>('#ReadFileByBrowser .file_content')!,
    document.querySelector<HTMLButtonElement>('#ReadFileByBrowser .button')!,
  );

  readFileByBrowserApi(
    document.querySelector<HTMLDivElement>(
      '#ReadFileByBrowserApi .file_content',
    )!,
    document.querySelector<HTMLButtonElement>('#ReadFileByBrowserApi .button')!,
    document.querySelector<HTMLDivElement>('#ReadFileByBrowserApi .status')!,
  );

  readFileByFetchTarget(
    document.querySelector<HTMLDivElement>(
      '#ReadFileByFetchTarget .file_content',
    )!,
    document.querySelector<HTMLInputElement>('#ReadFileByFetchTarget .input')!,
    document.querySelector<HTMLButtonElement>(
      '#ReadFileByFetchTarget .button',
    )!,
  );

  readFileByFetchInProject(
    document.querySelector<HTMLDivElement>(
      '#ReadFileByFetchInProject .file_content',
    )!,
  );

  readFileByImport(
    document.querySelector<HTMLDivElement>('#ReadFileByImport .file_content')!,
  );

  writeFileByBrowser(
    document.querySelector<HTMLTextAreaElement>(
      '#WriteFileByBrowser .file_content',
    )!,
    document.querySelector<HTMLButtonElement>('#WriteFileByBrowser .button')!,
    document.querySelector<HTMLDivElement>('#WriteFileByBrowser .status')!,
  );

  writeFileByBrowserApi(
    document.querySelector<HTMLTextAreaElement>(
      '#WriteFileByBrowserApi .file_content',
    )!,
    document.querySelector<HTMLButtonElement>(
      '#WriteFileByBrowserApi .button',
    )!,
    document.querySelector<HTMLDivElement>('#WriteFileByBrowserApi .status')!,
  );
}
